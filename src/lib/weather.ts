import { place } from '../config';

export type CompassKey = 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw';

export interface WeatherCurrent {
  temperature: number;
  apparent: number;
  humidity: number;
  precipitation: number;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
  windCompass: CompassKey;
  windGust: number;
  uvIndex: number;
  isDay: boolean;
}

export interface WeatherDay {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  precipSum: number;
  precipProbability: number;
  sunrise: string;
  sunset: string;
  uvMax: number;
  windMax: number;
  gustMax: number;
}

export interface WeatherBundle {
  fetchedAt: string;
  timezone: string;
  current: WeatherCurrent;
  days: WeatherDay[];
}

const UPSTREAM = 'https://api.open-meteo.com/v1/forecast';
const EDGE_CACHE_SECONDS = 900;
const MEMORY_TTL_MS = 15 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 7000;

const COMPASS: CompassKey[] = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];

/**
 * Keep one warm copy per runtime isolate so repeat renders (and the
 * in-page endpoint) never hit the network twice within the TTL window.
 * A long-lived edge cache sits in front of it on the deployed runtime.
 */
let memoryCache: { storedAt: number; data: WeatherBundle } | null = null;

function compassFrom(degrees: number): CompassKey {
  const idx = Math.round((((degrees % 360) + 360) % 360) / 45) % 8;
  return COMPASS[idx];
}

function buildUpstreamUrl(): string {
  const params = new URLSearchParams({
    latitude: String(place.latitude),
    longitude: String(place.longitude),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'precipitation',
      'weather_code',
      'wind_speed_10m',
      'wind_gusts_10m',
      'wind_direction_10m',
      'uv_index',
      'is_day',
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_sum',
      'precipitation_probability_max',
      'sunrise',
      'sunset',
      'uv_index_max',
      'wind_speed_10m_max',
      'wind_gusts_10m_max',
    ].join(','),
    timezone: 'Asia/Seoul',
    forecast_days: '7',
    wind_speed_unit: 'kmh',
  });
  return `${UPSTREAM}?${params.toString()}`;
}

const num = (value: unknown, fallback = 0): number => {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};

const clock = (value: unknown): string => {
  if (typeof value !== 'string') return '';
  const t = value.indexOf('T');
  return t === -1 ? '' : value.slice(t + 1, t + 6);
};

function normalize(payload: any): WeatherBundle | null {
  const c = payload?.current;
  const d = payload?.daily;
  if (!c || !d || !Array.isArray(d.time) || d.time.length === 0) return null;

  const current: WeatherCurrent = {
    temperature: num(c.temperature_2m),
    apparent: num(c.apparent_temperature),
    humidity: num(c.relative_humidity_2m),
    precipitation: num(c.precipitation),
    weatherCode: num(c.weather_code),
    windSpeed: num(c.wind_speed_10m),
    windDirection: num(c.wind_direction_10m),
    windCompass: compassFrom(num(c.wind_direction_10m)),
    windGust: num(c.wind_gusts_10m),
    uvIndex: num(c.uv_index),
    isDay: num(c.is_day, 1) === 1,
  };

  const days: WeatherDay[] = d.time
    .map((date: string, i: number) => ({
      date,
      weatherCode: num(d.weather_code?.[i]),
      tempMax: num(d.temperature_2m_max?.[i]),
      tempMin: num(d.temperature_2m_min?.[i]),
      precipSum: num(d.precipitation_sum?.[i]),
      precipProbability: num(d.precipitation_probability_max?.[i]),
      sunrise: clock(d.sunrise?.[i]),
      sunset: clock(d.sunset?.[i]),
      uvMax: num(d.uv_index_max?.[i]),
      windMax: num(d.wind_speed_10m_max?.[i]),
      gustMax: num(d.wind_gusts_10m_max?.[i]),
    }))
    .filter((day: WeatherDay) => !!day.date);

  if (days.length === 0) return null;

  return {
    fetchedAt: new Date().toISOString(),
    timezone: typeof payload?.timezone === 'string' ? payload.timezone : 'Asia/Seoul',
    current,
    days,
  };
}

/** Fetch the current conditions + 7-day outlook, served from cache when warm. */
export async function getWeather(): Promise<WeatherBundle | null> {
  const now = Date.now();
  if (memoryCache && now - memoryCache.storedAt < MEMORY_TTL_MS) {
    return memoryCache.data;
  }

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
    const data = normalize(await response.json());
    if (!data) throw new Error('incomplete payload');

    memoryCache = { storedAt: now, data };
    return data;
  } catch {
    // Serve the last good copy rather than showing an empty module.
    return memoryCache?.data ?? null;
  }
}

export interface WeatherCodeInfo {
  icon: string;
  key: string;
}

/** Map a WMO weather code to an icon + a localisable label key. */
export function weatherCodeInfo(code: number): WeatherCodeInfo {
  if (code === 0) return { icon: '☀️', key: 'clear' };
  if (code === 1) return { icon: '🌤️', key: 'mainlyClear' };
  if (code === 2) return { icon: '⛅', key: 'partlyCloudy' };
  if (code === 3) return { icon: '☁️', key: 'overcast' };
  if (code === 45 || code === 48) return { icon: '🌫️', key: 'fog' };
  if (code === 51 || code === 53 || code === 55) return { icon: '🌦️', key: 'drizzle' };
  if (code === 56 || code === 57) return { icon: '🌧️', key: 'freezingDrizzle' };
  if (code === 61 || code === 63 || code === 65) return { icon: '🌧️', key: 'rain' };
  if (code === 66 || code === 67) return { icon: '🌧️', key: 'freezingRain' };
  if (code === 71 || code === 73 || code === 75) return { icon: '❄️', key: 'snow' };
  if (code === 77) return { icon: '🌨️', key: 'snowGrains' };
  if (code === 80 || code === 81 || code === 82) return { icon: '🌦️', key: 'rainShowers' };
  if (code === 85 || code === 86) return { icon: '🌨️', key: 'snowShowers' };
  if (code === 95) return { icon: '⛈️', key: 'thunderstorm' };
  if (code === 96 || code === 99) return { icon: '⛈️', key: 'severeThunderstorm' };
  return { icon: '🌡️', key: 'unknown' };
}

export function uvLevelKey(uv: number): 'low' | 'moderate' | 'high' | 'veryHigh' | 'extreme' {
  if (uv < 3) return 'low';
  if (uv < 6) return 'moderate';
  if (uv < 8) return 'high';
  if (uv < 11) return 'veryHigh';
  return 'extreme';
}

/** Localised weekday label for a `YYYY-MM-DD` string. */
export function weekdayLabel(date: string, locale: string): string {
  const parsed = new Date(`${date}T12:00:00+09:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  try {
    return new Intl.DateTimeFormat(locale, { weekday: 'short', timeZone: 'Asia/Seoul' }).format(parsed);
  } catch {
    return date;
  }
}

/** Short month/day label for a `YYYY-MM-DD` string. */
export function monthDayLabel(date: string, locale: string): string {
  const parsed = new Date(`${date}T12:00:00+09:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  try {
    return new Intl.DateTimeFormat(locale, { month: 'numeric', day: 'numeric', timeZone: 'Asia/Seoul' }).format(parsed);
  } catch {
    return date;
  }
}

/* ------------------------------------------------------------------ *
 * Visitor-facing advice engine
 * ------------------------------------------------------------------ */

const DRIZZLE_CODES = new Set([51, 53, 55, 56, 57]);
const RAIN_CODES = new Set([61, 63, 65, 66, 67, 80, 81, 82]);
const HEAVY_RAIN_CODES = new Set([63, 65, 66, 67, 82]);
const STORM_CODES = new Set([95, 96, 99]);
const SNOW_CODES = new Set([71, 73, 75, 77, 85, 86]);
const FOG_CODES = new Set([45, 48]);

export type AdviceGroup = 'risk' | 'outfit' | 'plan' | 'items';

/**
 * A single advice line. It carries an i18n key instead of final text so the
 * same rule set renders in every language; `params` fills the `{placeholders}`
 * inside that key.
 */
export interface AdviceNote {
  group: AdviceGroup;
  key: string;
  params?: Record<string, string | number>;
}

export interface WeatherBrief {
  /** Only populated when something genuinely needs attention. */
  risks: AdviceNote[];
  outfit: AdviceNote[];
  plan: AdviceNote[];
  items: AdviceNote[];
}

/** Beaufort wind force (0–12) for a wind speed expressed in km/h. */
export function beaufort(kmh: number): number {
  const limits = [1, 6, 12, 20, 29, 39, 50, 62, 75, 89, 103, 118];
  const speed = Number.isFinite(kmh) ? Math.max(0, kmh) : 0;
  for (let i = 0; i < limits.length; i += 1) {
    if (speed < limits[i]) return i;
  }
  return 12;
}

/** Keep the "what to carry" list short enough to actually be read. */
const MAX_ITEMS = 6;

/**
 * Translate a forecast into advice a tourist can act on, so the reader never
 * has to work out what a number means for their day.
 *
 * Nothing is emitted unless its trigger is true — a dry day never mentions an
 * umbrella — and every line is titled by an i18n key so the wording stays
 * plain, localised and free of meteorological jargon.
 */
export function buildBrief(bundle: WeatherBundle): WeatherBrief {
  const now = bundle.current;
  const day = bundle.days[0];
  const risks: AdviceNote[] = [];
  const outfit: AdviceNote[] = [];
  const plan: AdviceNote[] = [];
  const itemKeys: string[] = [];

  if (!day) return { risks, outfit, plan, items: [] };

  const code = day.weatherCode;
  const stormy = STORM_CODES.has(code);
  const heavyRain = HEAVY_RAIN_CODES.has(code) || day.precipSum >= 15;
  const raining = RAIN_CODES.has(code) || DRIZZLE_CODES.has(code);
  const snowing = SNOW_CODES.has(code);
  const foggy = FOG_CODES.has(code);
  const wet = raining || stormy || snowing || now.precipitation > 0.2;

  const probability = Math.round(day.precipProbability);
  const rainLikely = probability >= 60;

  const force = beaufort(day.windMax);
  const gustForce = beaufort(day.gustMax);
  const strongWind = force >= 7 || gustForce >= 7;
  const windy = force >= 5 || gustForce >= 7;
  const breeze = force >= 4;

  const hot = day.tempMax >= 32;
  const heat = day.tempMax >= 35;
  const cold = day.tempMax <= 10;
  const chilly = day.tempMax <= 16;
  const swing = Math.round(day.tempMax - day.tempMin);
  const uvStrong = day.uvMax >= 5;

  // Risks come first and in order of how much they should change a plan.
  if (stormy) risks.push({ group: 'risk', key: 'thunderstorm' });
  if (heavyRain) risks.push({ group: 'risk', key: 'heavyRain' });
  if (strongWind) risks.push({ group: 'risk', key: 'strongWind' });
  if (heat) risks.push({ group: 'risk', key: 'heat' });
  if (foggy) risks.push({ group: 'risk', key: 'fog' });
  if (snowing) risks.push({ group: 'risk', key: 'snowIce' });

  // What to wear. Probability is always phrased as a chance, never a promise.
  if (raining || stormy) outfit.push({ group: 'outfit', key: 'rain' });
  else if (rainLikely) outfit.push({ group: 'outfit', key: 'rainProb', params: { prob: probability } });
  if (hot) outfit.push({ group: 'outfit', key: 'hot', params: { tmax: Math.round(day.tempMax) } });
  else if (cold) outfit.push({ group: 'outfit', key: 'cold', params: { tmax: Math.round(day.tempMax) } });
  else if (chilly) outfit.push({ group: 'outfit', key: 'cool', params: { tmax: Math.round(day.tempMax) } });
  if (swing > 8) outfit.push({ group: 'outfit', key: 'bigSwing', params: { swing } });
  if (windy) outfit.push({ group: 'outfit', key: 'windy' });
  if (uvStrong) outfit.push({ group: 'outfit', key: 'uv' });
  if (outfit.length === 0) outfit.push({ group: 'outfit', key: 'mild' });

  // What to do.
  if (stormy) plan.push({ group: 'plan', key: 'storm' });
  else if (heavyRain) plan.push({ group: 'plan', key: 'rain' });
  else if (snowing) plan.push({ group: 'plan', key: 'snow' });
  else if (raining) plan.push({ group: 'plan', key: 'drizzle' });
  else if (foggy) plan.push({ group: 'plan', key: 'fog' });
  else if (code === 0 || code === 1) plan.push({ group: 'plan', key: 'clear' });
  else if (code === 2) plan.push({ group: 'plan', key: 'cloudy' });
  else if (code === 3) plan.push({ group: 'plan', key: 'overcast' });
  else plan.push({ group: 'plan', key: 'mild' });
  if (hot) plan.push({ group: 'plan', key: 'hot' });
  if (cold || snowing) plan.push({ group: 'plan', key: 'cold' });
  if (windy) plan.push({ group: 'plan', key: 'windyClosed' });
  if (wet || breeze) plan.push({ group: 'plan', key: 'coastal' });

  const addItem = (key: string) => {
    if (!itemKeys.includes(key)) itemKeys.push(key);
  };
  if (heavyRain || stormy) addItem('raincoat');
  else if (raining || rainLikely) addItem('umbrella');
  if (uvStrong || hot) addItem('sunscreen');
  if (uvStrong) {
    addItem('sunglasses');
    addItem('hat');
  }
  if (hot) addItem('water');
  if (cold) {
    addItem('scarf');
    addItem('coat');
  } else if (chilly || swing > 8) {
    addItem('jacket');
  }
  if (wet || breeze) addItem('gripShoes');
  if (foggy) addItem('mask');

  const items: AdviceNote[] = itemKeys.slice(0, MAX_ITEMS).map((key) => ({ group: 'items', key }));

  return { risks, outfit, plan, items };
}
