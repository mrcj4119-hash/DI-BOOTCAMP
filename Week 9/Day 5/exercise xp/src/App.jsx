import { useState } from 'react'
import BookList from './components/BookList.jsx'
import { selectBooks } from './features/books/booksSelectors.js'
import { useSelector } from 'react-redux'
import './App.css'

const shelves = [
  { id: 'all', label: 'All books' },
  { id: 'horror', label: 'Horror' },
  { id: 'fantasy', label: 'Fantasy' },
  { id: 'science-fiction', label: 'Science fiction' },
]

function App() {
  const [activeGenre, setActiveGenre] = useState('all')
  const allBooks = useSelector(selectBooks)
  const activeShelf = shelves.find((shelf) => shelf.id === activeGenre)

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Between the Covers home">
          <span className="brand-mark" aria-hidden="true">b.</span>
          between the covers
        </a>
        <span className="topbar-note">A little room for every story.</span>
      </header>

      <section className="intro" aria-labelledby="page-title">
        <div className="intro-copy">
          <p className="eyebrow">WEEK 9 · DAY 5 · REDUX PERFORMANCE</p>
          <h1 id="page-title">
            Find your next
            <br />
            <span>good story.</span>
          </h1>
          <p className="intro-description">
            Wander through the shelves, choose a genre, and let a memoized
            selector find just the right books.
          </p>
        </div>
        <div className="hero-note" aria-hidden="true">
          <span className="hero-spark">✳</span>
          <span>THE READING ROOM</span>
          <strong>Every shelf<br />has a story.</strong>
        </div>
      </section>

      <section className="inventory" aria-labelledby="inventory-heading">
        <div className="inventory-heading">
          <div>
            <p className="eyebrow">THE COLLECTION</p>
            <h2 id="inventory-heading">Browse the shelves</h2>
            <p className="section-description">
              {activeGenre === 'all'
                ? 'A considered collection for curious readers.'
                : `Stories selected from the ${activeShelf.label.toLowerCase()} shelf.`}
            </p>
          </div>
          <span className="inventory-count">
            <strong>{allBooks.length}</strong> books
          </span>
        </div>

        <div className="shelf-controls">
          <div className="shelf-tabs" role="group" aria-label="Filter books by genre">
            {shelves.map((shelf) => (
              <button
                aria-pressed={activeGenre === shelf.id}
                className={`shelf-tab${activeGenre === shelf.id ? ' is-active' : ''}`}
                key={shelf.id}
                onClick={() => setActiveGenre(shelf.id)}
                type="button"
              >
                {shelf.label}
              </button>
            ))}
          </div>
          <span className="selector-note">
            <span className="selector-dot" aria-hidden="true" />
            Memoized selectors
          </span>
        </div>

        <BookList genre={activeGenre} />
        <p className="performance-note">
          Genre selectors recalculate only when the book inventory changes.
        </p>
      </section>

      <footer className="page-footer">
        <span>React + Redux Toolkit + React Redux</span>
        <span>One collection, thoughtfully sorted.</span>
      </footer>
    </main>
  )
}

export default App
