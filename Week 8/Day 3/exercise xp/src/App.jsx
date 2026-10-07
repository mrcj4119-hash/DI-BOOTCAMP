import { useRef, useState } from 'react'
import { ThemeProvider, useTheme } from './ThemeContext.jsx'

const CHARACTER_LIMIT = 280

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()
  const nextTheme = theme === 'light' ? 'dark' : 'light'

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} theme`}
      aria-pressed={theme === 'dark'}
    >
      <span aria-hidden="true">{theme === 'light' ? '☾' : '☀'}</span>
      <span>Switch to {nextTheme} mode</span>
    </button>
  )
}

function ThemeCard() {
  const { theme } = useTheme()

  return (
    <section className="exercise-card" aria-labelledby="theme-title">
      <div className="card-heading">
        <span className="exercise-number">01</span>
        <div>
          <p className="card-kicker">useContext + useState</p>
          <h2 id="theme-title">Theme switcher</h2>
        </div>
      </div>
      <p className="card-description">
        The theme is shared through context, so this card and the page update together.
      </p>
      <div className="theme-preview" role="status">
        <span className="status-dot" aria-hidden="true" />
        <span>You’re viewing the <strong>{theme}</strong> theme.</span>
      </div>
    </section>
  )
}

function CharacterCounter() {
  const inputRef = useRef(null)
  const [characterCount, setCharacterCount] = useState(0)

  function handleInput() {
    if (inputRef.current) {
      setCharacterCount(inputRef.current.value.length)
    }
  }

  return (
    <section className="exercise-card" aria-labelledby="counter-title">
      <div className="card-heading">
        <span className="exercise-number">02</span>
        <div>
          <p className="card-kicker">useRef</p>
          <h2 id="counter-title">Character counter</h2>
        </div>
      </div>
      <p className="card-description">
        Type a note below. The counter reads the input value from its ref as you type.
      </p>
      <label className="input-label" htmlFor="character-input">Your note</label>
      <textarea
        ref={inputRef}
        id="character-input"
        className="character-input"
        maxLength={CHARACTER_LIMIT}
        onChange={handleInput}
        placeholder="Write something here..."
        rows={5}
      />
      <div className="counter-row">
        <span id="character-count" aria-live="polite" aria-atomic="true">
          {characterCount} / {CHARACTER_LIMIT} characters
        </span>
        <span>{CHARACTER_LIMIT - characterCount} remaining</span>
      </div>
    </section>
  )
}

function Exercises() {
  const { theme } = useTheme()

  return (
    <main className="page-shell" data-theme={theme}>
      <header className="page-header">
        <div>
          <p className="eyebrow">Week 8 · Day 3 · Exercise XP</p>
          <h1>React hooks in action</h1>
          <p className="intro-copy">
            Share a theme with context and track text with a ref.
          </p>
        </div>
        <ThemeSwitcher />
      </header>

      <div className="exercise-grid">
        <ThemeCard />
        <CharacterCounter />
      </div>
      <footer className="page-footer">Two small exercises. A more interactive React app.</footer>
    </main>
  )
}

function App() {
  return (
    <ThemeProvider>
      <Exercises />
    </ThemeProvider>
  )
}

export default App
