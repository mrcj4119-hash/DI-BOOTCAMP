import { useState } from 'react'
import { searchCities } from '../api/weather.js'

function CitySearch({ onSelectCity }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const searchTerm = query.trim()

    if (!searchTerm) return

    setSearching(true)
    setError('')
    setResults([])

    try {
      const cities = await searchCities(searchTerm)
      if (cities.length === 0) {
        setError(`No cities found for “${searchTerm}”. Try another spelling.`)
      } else if (cities.length === 1) {
        setQuery('')
        onSelectCity(cities[0])
      } else {
        setResults(cities)
      }
    } catch (searchError) {
      setError(`City search failed: ${searchError.message}`)
    } finally {
      setSearching(false)
    }
  }

  function selectCity(city) {
    setQuery('')
    setResults([])
    setError('')
    onSelectCity(city)
  }

  return (
    <div className="search-area">
      <form className="search-form" onSubmit={handleSubmit} role="search">
        <label className="visually-hidden" htmlFor="city-search">Search for a city</label>
        <span className="search-icon" aria-hidden="true">⌕</span>
        <input
          id="city-search"
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setResults([])
            setError('')
          }}
          placeholder="Search a city..."
          autoComplete="off"
        />
        <button className="search-button" type="submit" disabled={searching || !query.trim()}>
          {searching ? 'Searching…' : 'Search'}
        </button>
      </form>
      {error && <p className="search-message" role="status">{error}</p>}
      {results.length > 0 && (
        <ul className="search-results" aria-label="Choose a city">
          {results.map((result) => (
            <li key={result.id}>
              <button type="button" onClick={() => selectCity(result)}>
                <span className="result-city">{result.name}</span>
                <span className="result-location">
                  {[result.admin1, result.country].filter(Boolean).join(', ')}
                </span>
                <span className="result-arrow" aria-hidden="true">↗</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CitySearch
