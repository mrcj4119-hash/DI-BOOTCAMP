import Greeting from './components/Greeting'
import Counter from './components/Counter'
import UserCard from './components/UserCard'
import UserList from './components/UserList'
import './App.css'

function App() {
  return (
    <main className="app-shell">
      <header className="page-header">
        <p className="eyebrow">Week 10 · Day 1</p>
        <h1>React + TypeScript</h1>
        <p>Five practical exercises in strongly typed React components.</p>
      </header>

      <section className="exercise-panel">
        <p className="description">
          This project was created with Vite using its React + TypeScript
          template.
        </p>
        <div className="status-badge"><span /> App is running</div>
      </section>

      <section className="exercise-panel">
        <Greeting name="Alex" messageCount={3} />
      </section>

      <section className="exercise-panel">
        <Counter />
      </section>

      <section className="exercise-panel">
        <div className="user-card-grid">
          <UserCard name="Sam Rivera" age={28} role="Frontend Developer" />
          <UserCard name="Taylor Kim" role="Designer" />
          <UserCard />
        </div>
      </section>

      <section className="exercise-panel">
        <UserList />
      </section>
    </main>
  )
}

export default App
