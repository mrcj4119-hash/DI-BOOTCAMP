import BookForm from './Components/BookForm.jsx'
import ContactForm from './Components/ContactForm.jsx'
import './App.css'

function App() {
  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">React practice · Forms and state</p>
        <h1>React & Forms</h1>
        <p className="page-intro">Collect information, keep it in state, and respond when a form is submitted.</p>
      </header>

      <div className="exercise-grid">
        <BookForm />
        <ContactForm />
      </div>
    </main>
  )
}

export default App