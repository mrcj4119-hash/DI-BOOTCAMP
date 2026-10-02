import Clock from './Components/Clock.jsx'
import Form from './Components/Form.jsx'
import './App.css'

function App() {
  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">React state · Lifecycle · Forms</p>
        <h1>Local time,<br />clear details.</h1>
      </header>

      <div className="content-grid">
        <Clock />
        <Form />
      </div>
    </main>
  )
}

export default App