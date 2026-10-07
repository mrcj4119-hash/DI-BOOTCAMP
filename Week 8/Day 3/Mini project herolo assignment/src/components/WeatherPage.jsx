import CitySearch from './CitySearch.jsx'
import { getWeatherDescription } from '../api/weather.js'

function WeatherPage({
  city,
  weather,
  loading,
  error,
  favorite,
  onSearch,
  onToggleFavorite,
  onRetry,
}) {
  const current = weather?.current
  const daily = weather?.daily
  const conditions = current ? getWeatherDescription(current.weather_code) : null

  return (
    <div className="page weather-page">
      <section className="welcome-row">
        <div>
          <p className="eyebrow">Your world, at a glance</p>
          <h1>Find your <span>forecast.</span></h1>
        </div>
        <div className="updated-note">
          <span className="live-dot" />
          Live weather
        </div>
      </section>

      <CitySearch onSelectCity={onSearch} />

      {error ? (
        <section className="message-card error-card" role="alert">
          <span className="message-icon" aria-hidden="true">!</span>
          <div>
            <h2>Weather unavailable</h2>
            <p>{error}</p>
            <button className="text-button" type="button" onClick={onRetry}>Try again</button>
          </div>
        </section>
      ) : loading || !weather ? (
        <section className="weather-card loading-card" aria-live="polite">
          <span className="loader" aria-hidden="true" />
          <p>Checking the skies over {city.name}…</p>
        </section>
      ) : (
        <>
          <section className="weather-card">
            <div className="weather-topline">
              <div className="location-heading">
                <span className="location-pin" aria-hidden="true">⌖</span>
                <div>
                  <h2>{city.name}</h2>
                  <p>{[city.admin1, city.country].filter(Boolean).join(', ')}</p>
                </div>
              </div>
              <button
                className={`favorite-button${favorite ? ' is-favorite' : ''}`}
                type="button"
                onClick={onToggleFavorite}
                aria-pressed={favorite}
                aria-label={favorite ? `Remove ${city.name} from favorites` : `Add ${city.name} to favorites`}
              >
                <span aria-hidden="true">{favorite ? '♥' : '♡'}</span>
                <span>{favorite ? 'Saved' : 'Save city'}</span>
              </button>
            </div>

            <div className="current-weather">
              <div className="temperature-block">
                <span className="weather-icon" role="img" aria-label={conditions.label}>
                  {conditions.icon}
                </span>
                <span className="temperature">{Math.round(current.temperature_2m)}°</span>
              </div>
              <div className="condition-block">
                <p className="condition-label">{conditions.label}</p>
                <p className="feels-like">Feels like {Math.round(current.apparent_temperature)}°</p>
                <p className="local-time">Local time · {current.time.slice(11, 16)}</p>
              </div>
            </div>

            <div className="weather-details">
              <WeatherDetail icon="💧" label="Humidity" value={`${current.relative_humidity_2m}%`} />
              <WeatherDetail icon="🌬" label="Wind" value={`${Math.round(current.wind_speed_10m)} km/h`} />
              <WeatherDetail icon="☔" label="Precipitation" value={`${current.precipitation} mm`} />
            </div>
          </section>

          <section className="forecast-section" aria-labelledby="forecast-heading">
            <div className="section-title-row">
              <div>
                <p className="eyebrow">The next few days</p>
                <h2 id="forecast-heading">5-day forecast</h2>
              </div>
              <span className="unit-note">°C</span>
            </div>
            <div className="forecast-grid">
              {daily.time.map((date, index) => {
                const dayConditions = getWeatherDescription(daily.weather_code[index])
                const day = new Date(`${date}T12:00:00`).toLocaleDateString(undefined, {
                  weekday: 'short',
                })
                return (
                  <article className="forecast-day" key={date}>
                    <p className="forecast-weekday">{index === 0 ? 'Today' : day}</p>
                    <span className="forecast-icon" role="img" aria-label={dayConditions.label}>
                      {dayConditions.icon}
                    </span>
                    <p className="forecast-description">{dayConditions.label}</p>
                    <div className="forecast-temperatures">
                      <strong>{Math.round(daily.temperature_2m_max[index])}°</strong>
                      <span>{Math.round(daily.temperature_2m_min[index])}°</span>
                    </div>
                    <p className="rain-chance">
                      <span aria-hidden="true">💧</span>
                      {daily.precipitation_probability_max[index] ?? 0}%
                    </p>
                  </article>
                )
              })}
            </div>
          </section>
        </>
      )}
    </div>
  )
}

function WeatherDetail({ icon, label, value }) {
  return (
    <div className="detail-item">
      <span className="detail-icon" aria-hidden="true">{icon}</span>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
      </div>
    </div>
  )
}

export default WeatherPage
