import { useSelector } from 'react-redux'
import AuthenticatedContent from './components/AuthenticatedContent.jsx'
import Login from './components/Login.jsx'
import './App.css'

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Goodwell home">
          <span className="brand-mark" aria-hidden="true">
            g
          </span>
          goodwell
        </a>
        <span className="topbar-caption">A calmer place to begin.</span>
      </header>

      <main className="auth-layout">
        <section className="story-panel" aria-labelledby="story-title">
          <div className="story-copy">
            <p className="eyebrow">A GOOD PLACE TO LAND</p>
            <h1 id="story-title">
              Make room
              <br />
              for <span>yourself.</span>
            </h1>
            <p>
              A little space to focus, find your rhythm, and make the day feel
              like your own.
            </p>
          </div>
          <div className="sun-art" aria-hidden="true">
            <span className="sun-core" />
            <span className="sun-ring sun-ring-one" />
            <span className="sun-ring sun-ring-two" />
            <span className="sun-caption">A FRESH START, ANYTIME</span>
          </div>
          <div className="story-footer">
            <span>TAKE IT ONE STEP AT A TIME</span>
            <span aria-hidden="true">✳</span>
          </div>
        </section>

        <section className="form-panel" aria-live="polite">
          {isAuthenticated ? (
            <AuthenticatedContent />
          ) : (
            <div className="login-card">
              <div className="login-icon" aria-hidden="true">
                <span>↗</span>
              </div>
              <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
              <h2>Welcome back</h2>
              <p className="form-intro">
                Sign in to settle in and pick up where you left off.
              </p>
              <Login />
              <p className="signup-note">
                New around here? <span>You’re in the right place.</span>
              </p>
            </div>
          )}
        </section>
      </main>

      <footer className="page-footer">
        <span>Made for a little more ease.</span>
        <span>WEEK 9 · DAY 3</span>
      </footer>
    </div>
  )
}

export default App
