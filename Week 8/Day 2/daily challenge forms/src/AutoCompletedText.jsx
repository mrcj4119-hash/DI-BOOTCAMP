import { Component } from 'react'
import countries from './countries.js'
import './AutoCompletedText.css'

class AutoCompletedText extends Component {
  constructor(props) {
    super(props)
    this.state = {
      suggestions: [],
      text: '',
    }
  }

  handleChange = (event) => {
    const text = event.target.value
    const suggestions = text
      ? countries.filter((country) => country.toLowerCase().startsWith(text.toLowerCase()))
      : []

    this.setState({ suggestions, text })
  }

  handleSelect = (country) => {
    this.setState({ text: country, suggestions: [] })
  }

  render() {
    const { suggestions, text } = this.state

    return (
      <main className="page">
        <section className="search-card">
          <p className="eyebrow">Explore the world</p>
          <h1>Find a country</h1>
          <p className="description">Start typing to see matching countries.</p>

          <div className="autocomplete">
            <label className="visually-hidden" htmlFor="country-search">
              Search countries
            </label>
            <input
              id="country-search"
              type="text"
              autoComplete="off"
              placeholder="Search a country..."
              onChange={this.handleChange}
              value={text}
              aria-autocomplete="list"
              aria-expanded={suggestions.length > 0}
              aria-controls="country-suggestions"
            />

            {suggestions.length > 0 && (
              <ul className="suggestions" id="country-suggestions" role="listbox">
                {suggestions.map((country) => (
                  <li key={country} role="option" aria-selected="false">
                    <button
                      type="button"
                      onClick={() => this.handleSelect(country)}
                    >
                      {country}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    )
  }
}

export default AutoCompletedText
