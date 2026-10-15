import UserData from './components/UserData.jsx'
import './App.css'

function App() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="People home">
          <span className="brand-mark" aria-hidden="true">p</span>
          people
        </a>
        <span className="topbar-note">A little more connected.</span>
      </header>

      <section className="intro" aria-labelledby="page-title">
        <div className="intro-copy">
          <p className="eyebrow">WEEK 9 · DAY 4 · REDUX THUNK</p>
          <h1 id="page-title">
            Meet the people
            <br />
            behind <span>the data.</span>
          </h1>
          <p className="intro-description">
            Fetch a profile, follow its journey through Redux, and see each
            request state in one simple directory.
          </p>
        </div>
        <div className="hero-note" aria-hidden="true">
          <span className="hero-spark">✳</span>
          <span>LIVE DATA</span>
          <strong>Thoughtfully<br />connected.</strong>
        </div>
      </section>

      <UserData />

      <footer className="page-footer">
        <span>React + Redux Toolkit + async thunk</span>
        <span>Powered by JSONPlaceholder</span>
      </footer>
    </main>
  )
}

export default App
