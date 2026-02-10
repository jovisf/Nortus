interface GeocodingResult {
  lat: number;
  lon: number;
}

interface NominatimResponse {
  lat: string;
  lon: string;
  display_name: string;
}

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';
const RATE_LIMIT_MS = 1000;

const geocodingCache = new Map<string, GeocodingResult>();

export async function geocodeCity(
  cityName: string,
  country: string = 'BR'
): Promise<GeocodingResult | null> {
  const cacheKey = `${cityName}-${country}`;

  if (geocodingCache.has(cacheKey)) {
    return geocodingCache.get(cacheKey)!;
  }

  try {
    const params = new URLSearchParams({
      q: cityName,
      countrycodes: country,
      format: 'json',
      limit: '1',
      addressdetails: '0',
    });

    const response = await fetch(`${NOMINATIM_BASE_URL}/search?${params}`, {
      headers: {
        'User-Agent': 'Nortus Dashboard App',
      },
    });

    if (!response.ok) {
      console.error(`Geocoding failed for ${cityName}:`, response.statusText);
      return null;
    }

    const data: NominatimResponse[] = await response.json();

    if (data.length === 0) {
      console.warn(`No results found for ${cityName}`);
      return null;
    }

    const result: GeocodingResult = {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
    };

    geocodingCache.set(cacheKey, result);

    return result;
  } catch (error) {
    console.error(`Error geocoding ${cityName}:`, error);
    return null;
  }
}

export async function geocodeCities(
  cityNames: string[],
  country: string = 'BR'
): Promise<Map<string, GeocodingResult>> {
  const results = new Map<string, GeocodingResult>();

  for (const cityName of cityNames) {
    const coords = await geocodeCity(cityName, country);
    if (coords) {
      results.set(cityName, coords);
    }

    if (cityNames.indexOf(cityName) < cityNames.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, RATE_LIMIT_MS));
    }
  }

  return results;
}

export function clearGeocodingCache(): void {
  geocodingCache.clear();
}
