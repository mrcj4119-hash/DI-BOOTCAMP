import { useCallback, useState, type FormEvent } from 'react'
import DataFetcher from './components/DataFetcher'
import { fetchRecipes } from './api/api'
import type { RecipeSearchResponse } from './types/types'
import './App.css'

function isRecipeSearchResponse(value: unknown): value is RecipeSearchResponse {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const response = value as Record<string, unknown>
  return (
    typeof response.totalResults === 'number' &&
    Array.isArray(response.results) &&
    response.results.every((recipe: unknown) => {
      if (typeof recipe !== 'object' || recipe === null) {
        return false
      }
      const item = recipe as Record<string, unknown>
      return (
        typeof item.id === 'number' &&
        typeof item.title === 'string' &&
        typeof item.image === 'string'
      )
    })
  )
}

function App() {
  const [input, setInput] = useState('pasta')
  const [query, setQuery] = useState('pasta')
  const loadRecipes = useCallback(
    (signal: AbortSignal) => fetchRecipes(query, signal),
    [query],
  )

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextQuery = input.trim()
    if (nextQuery) {
      setQuery(nextQuery)
    }
  }

  return (
    <main className="app-shell">
      <header className="page-header">
        <p className="eyebrow">Week 10 · Day 2 · Daily Challenge</p>
        <h1>Recipe <span>Explorer</span></h1>
        <p>One generic data fetcher, ready for any typed API response.</p>
      </header>

      <section className="search-panel" aria-label="Search recipes">
        <form onSubmit={handleSearch}>
          <label htmlFor="recipe-query">What sounds good?</label>
          <div className="search-row">
            <input
              id="recipe-query"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Search recipes"
              required
            />
            <button type="submit">Find recipes <span aria-hidden="true">→</span></button>
          </div>
        </form>
        <p>Live recipe search powered by Spoonacular API.</p>
      </section>

      <section className="results-section" aria-live="polite">
        <div className="results-heading">
          <div>
            <p className="eyebrow">Fresh from the kitchen</p>
            <h2>Results for “{query}”</h2>
          </div>
        </div>
        <DataFetcher<RecipeSearchResponse>
          fetchData={loadRecipes}
          isData={isRecipeSearchResponse}
          emptyMessage="No recipes matched that search."
          renderData={(data) =>
            data.results.length === 0 ? (
              <p className="state-message">No recipes matched that search.</p>
            ) : (
              <>
                <p className="result-count">{data.totalResults} recipes found</p>
                <div className="recipe-grid">
                  {data.results.map((recipe) => (
                    <article className="recipe-card" key={recipe.id}>
                      <img src={recipe.image} alt="" loading="lazy" />
                      <h3>{recipe.title}</h3>
                    </article>
                  ))}
                </div>
              </>
            )
          }
        />
      </section>
      <footer>Typed fetching. Shared state. Better recipes.</footer>
    </main>
  )
}

export default App
