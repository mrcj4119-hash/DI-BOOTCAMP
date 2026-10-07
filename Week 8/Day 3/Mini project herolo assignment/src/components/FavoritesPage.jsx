import { getCityKey } from '../api/weather.js'
import { Link } from 'react-router-dom'

function FavoritesPage({ favorites, onSelectCity, onRemoveFavorite }) {
  return (
    <div className="page favorites-page">
      <section className="welcome-row">
        <div>
          <p className="eyebrow">Your saved places</p>
          <h1>Favorite <span>cities.</span></h1>
        </div>
        <div className="favorites-total">
          <span aria-hidden="true">♥</span>
          {favorites.length} {favorites.length === 1 ? 'city' : 'cities'}
        </div>
      </section>

      {favorites.length === 0 ? (
        <section className="empty-favorites">
          <span className="empty-favorite-icon" aria-hidden="true">♡</span>
          <h2>No favorite cities yet</h2>
          <p>Search for a city and save it to keep its forecast close.</p>
          <Link className="primary-link" to="/">Explore weather</Link>
        </section>
      ) : (
        <div className="favorite-grid">
          {favorites.map((city) => (
            <article className="favorite-card" key={getCityKey(city)}>
              <div className="favorite-card-top">
                <span className="favorite-weather-icon" aria-hidden="true">☀️</span>
                <button
                  className="remove-favorite"
                  type="button"
                  onClick={() => onRemoveFavorite(city)}
                  aria-label={`Remove ${city.name} from favorites`}
                >
                  ×
                </button>
              </div>
              <h2>{city.name}</h2>
              <p>{[city.admin1, city.country].filter(Boolean).join(', ')}</p>
              <button
                className="view-weather-button"
                type="button"
                onClick={() => onSelectCity(city)}
              >
                View weather
                <span aria-hidden="true">↗</span>
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default FavoritesPage
