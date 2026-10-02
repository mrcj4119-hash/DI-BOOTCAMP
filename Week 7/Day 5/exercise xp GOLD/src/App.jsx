import Forms from './Components/Forms.jsx'
import './App.css'

function App() {
  return (
    <main className="app-shell">
      <header className="page-header">
        <h1>React Forms</h1>
        <p className="intro-copy">Controlled inputs, validation, and form events.</p>
      </header>
      <Forms />
    </main>
  )
}

export default App