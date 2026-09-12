import { place } from '../config';

export type TideTrend = 'rising' | 'falling';
export type TideEventType = 'high' | 'low';

export interface TideEvent {
  type: TideEventType;
  /** Local calendar date, `YYYY-MM-DD` (Asia/Seoul). */
  date: string;
  /** Local wall-clock time, `HH:MM` (Asia/Seoul). */
  time: string;
  /** Height in metres relative to mean sea level; may be negative. */
  height: number;
}

export interface TideDay {
  date: string;
  events: TideEvent[];
  /** Difference between the day's highest and lowest sample, in metres. */
  range: number | null;
}

export interface TideCurrent {
  height: number;
  trend: TideTrend;
  date: string;
  time: string;
}

export interface TideBundle {
  fetchedAt: string;
  timezone: string;
  current: TideCurrent | null;
  next: { high: TideEvent | null; low: TideEvent | null };
  /** Today's lowest and highest sample, used to place the current height. */
  today: { min: number; max: number } | null;
  days: TideDay[];
}

/** Internal event shape carrying a sortable timestamp. */
interface RawEvent extends TideEvent {
  ms: number;
}

/**
 * Parsed tide series kept in the cache. The derived reading (current height,
 * trend, next extremes) is recomputed on every call so a warm cache never
 * serves a stale "now".
 */
interface TideData {
  fetchedAt: string;
  timezone: string;
  times: string[];
  heights: number[];
  events: RawEvent[];
  ranges: Map<string, { min: number; max: number }>;
}

const UPSTREAM = 'https://marine-api.open-meteo.com/v1/marine';
const EDGE_CACHE_SECONDS = 1800;
const MEMORY_TTL_MS = 30 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 8000;
const FORECAST_DAYS = 7;
/** Two extremes closer than this are treated as one (plateau artefacts). */
const MIN_EVENT_GAP_MS = 2 * 60 * 60 * 1000;

let memoryCache: { storedAt: number; data: TideData } | null = null;

/** Local (Asia/Seoul) epoch milliseconds for an upstream `YYYY-MM-DDTHH:MM` stamp. */
function stampToMs(stamp: string): number {
  return Date.parse(stamp.length === 16 ? `${stamp}:00+09:00` : `${stamp}+09:00`);
}

/** Epoch milliseconds of a tide extreme, for scheduling and countdowns. */
export function eventMs(event: TideEvent): number {
  return stampToMs(`${event.date}T${event.time}`);
}

function buildUpstreamUrl(): string {
  const params = new URLSearchParams({
    latitude: String(place.latitude),
    longitude: String(place.longitude),
    minutely_15: 'sea_level_height_msl',
    timezone: 'Asia/Seoul',
    forecast_days: String(FORECAST_DAYS),
    // The park sits on land; pick the nearest sea grid cell instead of the sand.
    cell_selection: 'sea',
  });
  return `${UPSTREAM}?${params.toString()}`;
}

/** Locate high/low tides by looking for sign changes in the height slope. */
function detectEvents(times: string[], heights: number[]): RawEvent[] {
  const raw: RawEvent[] = [];

  for (let i = 1; i < times.length - 1; i++) {
    const before = heights[i - 1];
    const here = heights[i];
    const after = heights[i + 1];

    let type: TideEventType | null = null;
    if (here >= before && here > after) type = 'high';
    else if (here <= before && here < after) type = 'low';
    if (!type) continue;

    const ms = stampToMs(times[i]);
    if (!Number.isFinite(ms)) continue;

    raw.push({
      type,
      date: times[i].slice(0, 10),
      time: times[i].slice(11, 16),
      height: here,
      ms,
    });
  }

  // Keep the strongest extreme when a short plateau reports the same type twice.
  const merged: RawEvent[] = [];
  for (const event of raw) {
    const last = merged[merged.length - 1];
    if (last && last.type === event.type && event.ms - last.ms < MIN_EVENT_GAP_MS) {
      const stronger = event.type === 'high' ? event.height > last.height : event.height < last.height;
      if (stronger) merged[merged.length - 1] = event;
      continue;
    }
    merged.push(event);
  }

  return merged;
}

function dayRanges(times: string[], heights: number[]): Map<string, { min: number; max: number }> {
  const ranges = new Map<string, { min: number; max: number }>();
  for (let i = 0; i < times.length; i++) {
    const date = times[i].slice(0, 10);
    const height = heights[i];
    const current = ranges.get(date);
    if (!current) ranges.set(date, { min: height, max: height });
    else {
      if (height < current.min) current.min = height;
      if (height > current.max) current.max = height;
    }
  }
  return ranges;
}

function normalize(payload: any): TideData | null {
  const block = payload?.minutely_15;
  const rawTimes = Array.isArray(block?.time) ? block.time : [];
  const rawValues = Array.isArray(block?.sea_level_height_msl) ? block.sea_level_height_msl : [];
  const count = Math.min(rawTimes.length, rawValues.length);

  const times: string[] = [];
  const heights: number[] = [];
  for (let i = 0; i < count; i++) {
    const height = Number(rawValues[i]);
    if (typeof rawTimes[i] !== 'string' || !Number.isFinite(height)) continue;
    times.push(rawTimes[i]);
    heights.push(height);
  }
  if (times.length < 3) return null;

  const events = detectEvents(times, heights);
  if (events.length === 0) return null;

  return {
    fetchedAt: new Date().toISOString(),
    timezone: typeof payload?.timezone === 'string' ? payload.timezone : 'Asia/Seoul',
    times,
    heights,
    events,
    ranges: dayRanges(times, heights),
  };
}

async function fetchTide(): Promise<TideData | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    let response: Response;
    try {
      const init: RequestInit & { cf?: { cacheTtl: number; cacheEverything: boolean } } = {
        signal: controller.signal,
        headers: { accept: 'application/json' },
        cf: { cacheTtl: EDGE_CACHE_SECONDS, cacheEverything: true },
      };
      response = await fetch(buildUpstreamUrl(), init);
    } finally {
      clearTimeout(timer);
    }

    if (!response.ok) throw new Error(`upstream ${response.status}`);
    return normalize(await response.json());
  } catch {
    return null;
  }
}

function toEvent(event: RawEvent): TideEvent {
  return { type: event.type, date: event.date, time: event.time, height: event.height };
}

/** Read "now" from the cached series so a warm cache still reports a live value. */
function buildBundle(data: TideData, now: number): TideBundle {
  const { times, heights, events, ranges } = data;

  let nearest = 0;
  let bestDiff = Infinity;
  for (let i = 0; i < times.length; i++) {
    const diff = Math.abs(stampToMs(times[i]) - now);
    if (diff < bestDiff) {
      bestDiff = diff;
      nearest = i;
    }
  }

  const height = heights[nearest];
  const back = heights[Math.max(0, nearest - 2)];
  const ahead = heights[Math.min(heights.length - 1, nearest + 2)];

  const todayDate = times[nearest].slice(0, 10);
  const today = ranges.get(todayDate) ?? null;

  const nextEvent = (type: TideEventType): TideEvent | null => {
    const found = events.find((event) => event.type === type && event.ms > now);
    return found ? toEvent(found) : null;
  };

  const days: TideDay[] = [...ranges.keys()]
    .sort()
    .map((date) => {
      const dayRange = ranges.get(date);
      return {
        date,
        events: events.filter((event) => event.date === date).map(toEvent),
        range: dayRange ? dayRange.max - dayRange.min : null,
      };
    });

  return {
    fetchedAt: data.fetchedAt,
    timezone: data.timezone,
    current: {
      height,
      trend: ahead >= back ? 'rising' : 'falling',
      date: todayDate,
      time: times[nearest].slice(11, 16),
    },
    next: { high: nextEvent('high'), low: nextEvent('low') },
    today,
    days,
  };
}

/** Astronomical tide outlook, served from cache when warm. */
export async function getTide(): Promise<TideBundle | null> {
  const now = Date.now();

  if (memoryCache && now - memoryCache.storedAt < MEMORY_TTL_MS) {
    return buildBundle(memoryCache.data, now);
  }

  const fresh = await fetchTide();
  if (fresh) {
    memoryCache = { storedAt: now, data: fresh };
    return buildBundle(fresh, now);
  }

  // Serve the last good copy rather than showing an empty module.
  return memoryCache ? buildBundle(memoryCache.data, now) : null;
}

/** Place the current height inside the day's range: low / mid / high. */
export function tideLevelKey(height: number, min: number, max: number): 'low' | 'mid' | 'high' {
  if (!(max > min)) return 'mid';
  const ratio = (height - min) / (max - min);
  if (ratio <= 0.33) return 'low';
  if (ratio >= 0.67) return 'high';
  return 'mid';
}
