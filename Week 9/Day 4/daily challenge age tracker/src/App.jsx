import AgeControls from './components/AgeControls.jsx'
import AgeDisplay from './components/AgeDisplay.jsx'
import './App.css'

function App() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Age Tracker home">
          <span className="brand-mark" aria-hidden="true">A</span>
          <span>Age Tracker</span>
        </a>
        <span className="topbar-note">A little time, one year at a time.</span>
      </header>

      <section className="tracker-card" aria-labelledby="page-title">
        <div className="card-orbit orbit-one" aria-hidden="true" />
        <div className="card-orbit orbit-two" aria-hidden="true" />
        <div className="card-content">
          <p className="eyebrow">WEEK 9 · DAY 4 · DAILY CHALLENGE</p>
          <h1 id="page-title">Time is yours<br />to <span>track.</span></h1>
          <p className="description">
            Adjust your age and watch Redux handle each update asynchronously.
          </p>

          <AgeDisplay />
          <AgeControls />
          <p className="hint">Each change takes one second to complete.</p>
        </div>
      </section>

      <footer className="page-footer">
        <span>Built with React + Redux Toolkit</span>
        <span>Thunk middleware included</span>
      </footer>
    </main>
  )
}

export default App
