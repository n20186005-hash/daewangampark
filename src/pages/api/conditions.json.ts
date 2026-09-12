import type { APIRoute } from 'astro';
import { getWeather } from '../../lib/weather';

// Rendered on demand (never at build time) and cached at the edge so the
// upstream lookup happens at most a few times per caching window.
export const prerender = false;

export const GET: APIRoute = async () => {
  const data = await getWeather();

  if (!data) {
    return new Response(JSON.stringify({ ok: false }), {
      status: 503,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store',
      },
    });
  }

  const today = data.days[0];

  return new Response(
    JSON.stringify({
      ok: true,
      updatedAt: data.fetchedAt,
      current: {
        temperature: data.current.temperature,
        apparent: data.current.apparent,
        weatherCode: data.current.weatherCode,
        isDay: data.current.isDay,
        windSpeed: data.current.windSpeed,
        precipitation: data.current.precipitation,
      },
      today: {
        sunrise: today?.sunrise ?? '',
        sunset: today?.sunset ?? '',
        tempMax: today?.tempMax ?? null,
        tempMin: today?.tempMin ?? null,
      },
    }),
    {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'public, max-age=600, s-maxage=900, stale-while-revalidate=1800',
      },
    }
  );
};
