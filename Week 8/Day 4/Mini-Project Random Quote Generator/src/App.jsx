import { useState } from 'react'
import quotes from './quotes.js'
import './App.css'

const palettes = [
  { page: '#f5efe5', ink: '#9a4f37', button: '#9a4f37', buttonInk: '#fffaf4' },
  { page: '#e9f0e8', ink: '#315b50', button: '#315b50', buttonInk: '#f8fbf7' },
  { page: '#eeeafa', ink: '#62518b', button: '#62518b', buttonInk: '#fbfaff' },
  { page: '#f8eadf', ink: '#a6533d', button: '#a6533d', buttonInk: '#fffaf6' },
  { page: '#e8eff5', ink: '#345c78', button: '#345c78', buttonInk: '#f7fbff' },
  { page: '#f5edcf', ink: '#786126', button: '#786126', buttonInk: '#fffdf5' },
  { page: '#f2e8eb', ink: '#8c4f64', button: '#8c4f64', buttonInk: '#fff9fb' },
]

function randomIndexExcept(length, currentIndex) {
  return (currentIndex + 1 + Math.floor(Math.random() * (length - 1))) % length
}

function App() {
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * quotes.length))
  const [paletteIndex, setPaletteIndex] = useState(() => Math.floor(Math.random() * palettes.length))
  const quote = quotes[quoteIndex]
  const palette = palettes[paletteIndex]

  function showAnotherQuote() {
    setQuoteIndex((currentIndex) => randomIndexExcept(quotes.length, currentIndex))
    setPaletteIndex((currentIndex) => randomIndexExcept(palettes.length, currentIndex))
  }

  return (
    <main className="page" style={{ '--page-color': palette.page }}>
      <div className="grain" aria-hidden="true" />
      <header className="masthead">
        <a className="wordmark" href="/" aria-label="Little Words home">
          <span className="wordmark-icon" aria-hidden="true">✳</span>
          little words
        </a>
        <span className="edition">A moment of inspiration</span>
      </header>

      <section className="quote-stage" aria-label="Random quote">
        <div className="intro">
          <span className="eyebrow"><span /> A NOTE FOR TODAY</span>
          <h1>A little perspective<br />goes a long way.</h1>
          <p>Take a breath. Find a thought to carry with you.</p>
        </div>

        <article className="quote-card" aria-live="polite" aria-atomic="true">
          <span className="quote-mark" style={{ color: palette.ink }} aria-hidden="true">
            “
          </span>
          <blockquote className="quote-text" style={{ color: palette.ink }}>
            {quote.quote}
          </blockquote>
          <p className="quote-author">
            <span className="author-rule" style={{ backgroundColor: palette.ink }} />
            {quote.author}
          </p>
          <div className="card-footer">
            <span className="quote-count">
              THOUGHT <span>{String(quoteIndex + 1).padStart(2, '0')}</span>
            </span>
            <button
              className="next-button"
              type="button"
              onClick={showAnotherQuote}
              style={{ '--button-color': palette.button, '--button-ink': palette.buttonInk }}
            >
              <span>Another thought</span>
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 10h11M10 5l5 5-5 5" />
              </svg>
            </button>
          </div>
        </article>

        <span className="side-note" aria-hidden="true">PAUSE · READ · BEGIN AGAIN</span>
      </section>

      <footer className="page-footer">
        <span>WORDS TO KEEP CLOSE</span>
        <span>ONE THOUGHT AT A TIME <span className="footer-star">✳</span></span>
      </footer>
    </main>
  )
}

export default App
