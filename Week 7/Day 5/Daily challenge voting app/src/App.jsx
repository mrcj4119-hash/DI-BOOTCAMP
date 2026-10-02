import { useState } from 'react'
import './App.css'

function App() {
  const [languages, setLanguages] = useState([
    { name: 'Php', votes: 0 },
    { name: 'Python', votes: 0 },
    { name: 'JavaScript', votes: 0 },
    { name: 'Java', votes: 0 },
  ])

  const castVote = (languageName) => {
    setLanguages((currentLanguages) => currentLanguages.map((language) => (
      language.name === languageName
        ? { ...language, votes: language.votes + 1 }
        : language
    )))
  }

  const totalVotes = languages.reduce((total, language) => total + language.votes, 0)

  return (
    <main className="vote-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Developer pulse</p>
          <h1>Pick your language.</h1>
          <p className="intro-copy">One tap adds a vote. Which language gets yours?</p>
        </div>
        <div className="total-count" aria-live="polite">
          <span className="total-value">{totalVotes}</span>
          <span className="total-label">total votes</span>
        </div>
      </header>

      <section className="language-list" aria-label="Vote for a programming language">
        {languages.map((language, index) => (
          <article className="language-row" key={language.name}>
            <span className="language-index">0{index + 1}</span>
            <h2>{language.name}</h2>
            <div className="vote-count" aria-live="polite">
              <span className="vote-number">{language.votes}</span>
              <span className="vote-label">{language.votes === 1 ? 'vote' : 'votes'}</span>
            </div>
            <button
              className="vote-button"
              type="button"
              aria-label={`Vote for ${language.name}`}
              onClick={() => castVote(language.name)}
            >
              Vote <span aria-hidden="true">+</span>
            </button>
          </article>
        ))}
      </section>

      <footer className="page-footer">
        <span>Community poll</span>
        <span>Choose your favorite</span>
      </footer>
    </main>
  )
}

export default App