import { useEffect, useRef, useState } from 'react'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import {
  fetchWeather,
  getCityKey,
} from './api/weather.js'
import FavoritesPage from './components/FavoritesPage.jsx'
import WeatherPage from './components/WeatherPage.jsx'

const FAVORITES_STORAGE_KEY = 'herolo-weather-favorites'

const initialCity = {
  id: '293397',
  name: 'Tel Aviv',
  admin1: 'Tel Aviv District',
  country: 'Israel',
  countryCode: 'IL',
  latitude: 32.0809,
  longitude: 34.7806,
  timezone: 'Asia/Jerusalem',
}

function readFavorites() {
  try {
    const saved = localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (!saved) return { favorites: [], error: '' }

    const parsed = JSON.parse(saved)
    if (!Array.isArray(parsed)) {
      throw new Error('Saved favorites have an invalid format.')
    }

    const favorites = parsed.filter((city) =>
      city &&
      typeof city.name === 'string' &&
      typeof city.latitude === 'number' &&
      Number.isFinite(city.latitude) &&
      typeof city.longitude === 'number' &&
      Number.isFinite(city.longitude),
    )

    if (favorites.length !== parsed.length) {
      throw new Error('Some saved favorites could not be loaded.')
    }

    return { favorites, error: '' }
  } catch (error) {
    return {
      favorites: [],
      error: `Could not load saved favorites: ${error.message}`,
    }
  }
}

function App() {
  const navigate = useNavigate()
  const [city, setCity] = useState(initialCity)
  const [weather, setWeather] = useState(null)
  const [weatherLoading, setWeatherLoading] = useState(true)
  const [weatherError, setWeatherError] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)
  const [favoritesState] = useState(readFavorites)
  const [favorites, setFavorites] = useState(favoritesState.favorites)
  const [storageError, setStorageError] = useState(favoritesState.error)
  const lastPersistedFavorites = useRef(favorites)

  useEffect(() => {
    let cancelled = false
    setWeatherLoading(true)
    setWeatherError('')

    fetchWeather(city)
      .then((result) => {
        if (!cancelled) setWeather(result)
      })
      .catch((error) => {
        if (!cancelled) {
          setWeatherError(`Could not load weather: ${error.message}`)
          setWeather(null)
        }
      })
      .finally(() => {
        if (!cancelled) setWeatherLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [city, refreshKey])

  useEffect(() => {
    if (lastPersistedFavorites.current === favorites) return
    lastPersistedFavorites.current = favorites

    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
      setStorageError('')
    } catch (error) {
      setStorageError(`Could not save favorites on this device: ${error.message}`)
    }
  }, [favorites])

  function isFavorite(location) {
    return favorites.some((favorite) => getCityKey(favorite) === getCityKey(location))
  }

  function toggleFavorite(location) {
    const locationKey = getCityKey(location)
    setFavorites((currentFavorites) => {
      const alreadySaved = currentFavorites.some(
        (favorite) => getCityKey(favorite) === locationKey,
      )
      return alreadySaved
        ? currentFavorites.filter((favorite) => getCityKey(favorite) !== locationKey)
        : [...currentFavorites, location]
    })
  }

  function removeFavorite(location) {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((favorite) => getCityKey(favorite) !== getCityKey(location)),
    )
  }

  function showWeatherFor(location) {
    setCity(location)
    setWeatherError('')
    navigate('/')a
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-inner">
          <NavLink className="brand" to="/" aria-label="Herolo Weather home">
            <span className="brand-icon" aria-hidden="true">☀</span>
            <span>herolo<span className="brand-light">weather</span></span>
          </NavLink>
          <nav className="main-nav" aria-label="Main navigation">
            <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/" end>
              Weather
            </NavLink>
            <NavLink
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              to="/favorites"
            >
              Favorites
              {favorites.length > 0 && <span className="nav-count">{favorites.length}</span>}
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="main-content">
        {storageError && <p className="storage-notice" role="alert">{storageError}</p>}
        <Routes>
          <Route
            path="/"
            element={
              <WeatherPage
                city={city}
                weather={weather}
                loading={weatherLoading}
                error={weatherError}
                favorite={isFavorite(city)}
                onSearch={showWeatherFor}
                onToggleFavorite={() => toggleFavorite(city)}
                onRetry={() => setRefreshKey((key) => key + 1)}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                favorites={favorites}
                onSelectCity={showWeatherFor}
                onRemoveFavorite={removeFavorite}
              />
            }
          />
          <Route path="*" element={<NotFound onGoHome={() => navigate('/')} />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <span>Weather data by Open-Meteo</span>
        <span>Made for your next sunny day.</span>
      </footer>
    </div>
  )
}

function NotFound({ onGoHome }) {
  return (
    <section className="not-found">
      <span className="not-found-icon" aria-hidden="true">🌥</span>
      <h1>That forecast is off the map.</h1>
      <button className="primary-button" type="button" onClick={onGoHome}>
        Back to weather
      </button>
    </section>
  )
}

export default App
