import UserDirectory from './components/UserDirectory.jsx'
import './App.css'

function App() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <span className="brand-mark">T</span>
          <div>
            <p className="eyebrow">WEEK 9 · DAY 4 · XP NINJA</p>
            <h1>Team Pulse</h1>
          </div>
        </div>
      </header>

      <UserDirectory />

      <footer className="page-footer">
        <span>React + Redux Toolkit + async thunks</span>
        <span>JSONPlaceholder data</span>
      </footer>
    </main>
  )
}

export default App
