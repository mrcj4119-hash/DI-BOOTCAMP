const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

async function fetchJson(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Weather service returned an error (${response.status}).`)
  }

  return response.json()
}

export async function searchCities(query) {
  const params = new URLSearchParams({
    name: query,
    count: '8',
    language: 'en',
    format: 'json',
  })
  const data = await fetchJson(`${GEOCODING_URL}?${params}`)
  return (data.results ?? []).map((city) => ({
    id: String(city.id),
    name: city.name,
    admin1: city.admin1 ?? '',
    country: city.country ?? '',
    countryCode: city.country_code ?? '',
    latitude: city.latitude,
    longitude: city.longitude,
    timezone: city.timezone ?? 'auto',
  }))
}

export async function fetchWeather(city) {
  const params = new URLSearchParams({
    latitude: String(city.latitude),
    longitude: String(city.longitude),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'weather_code',
      'wind_speed_10m',
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_probability_max',
    ].join(','),
    timezone: city.timezone || 'auto',
    forecast_days: '5',
    temperature_unit: 'celsius',
    wind_speed_unit: 'kmh',
  })
  return fetchJson(`${FORECAST_URL}?${params}`)
}

export function getWeatherDescription(code) {
  if (code === 0) return { label: 'Clear sky', icon: '☀️' }
  if ([1, 2].includes(code)) return { label: 'Partly cloudy', icon: '🌤️' }
  if (code === 3) return { label: 'Overcast', icon: '☁️' }
  if ([45, 48].includes(code)) return { label: 'Foggy', icon: '🌫️' }
  if ([51, 53, 55, 56, 57].includes(code)) return { label: 'Drizzle', icon: '🌦️' }
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return { label: 'Rain', icon: '🌧️' }
  }
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { label: 'Snow', icon: '❄️' }
  if ([95, 96, 99].includes(code)) return { label: 'Thunderstorm', icon: '⛈️' }
  return { label: 'Current conditions', icon: '🌡️' }
}

export function getCityKey(city) {
  return `${city.latitude.toFixed(3)},${city.longitude.toFixed(3)}`
}
