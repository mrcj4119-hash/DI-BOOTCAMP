import AddTodo from './components/AddTodo.jsx'
import TodoList from './components/TodoList.jsx'
import './App.css'

function App() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Daylist home">
          <span className="brand-mark" aria-hidden="true">d</span>
          daylist
        </a>
        <span className="topbar-note">A little more done, one day at a time.</span>
      </header>

      <section className="intro" aria-labelledby="page-title">
        <div className="intro-copy">
          <p className="eyebrow">WEEK 9 · DAY 4 · REDUX THUNKS</p>
          <h1 id="page-title">
            A clearer mind
            <br />
            starts with <span>one list.</span>
          </h1>
          <p className="intro-description">
            Gather your thoughts, take the next small step, and enjoy the
            satisfaction of checking it off.
          </p>
        </div>
        <div className="day-stamp" aria-hidden="true">
          <span>ONE DAY</span>
          <strong>at a time</strong>
          <span className="stamp-line" />
          <span>YOU’VE GOT THIS</span>
        </div>
      </section>

      <section className="todo-panel" aria-label="Todo list">
        <AddTodo />
        <TodoList />
      </section>

      <footer className="page-footer">
        <span>Small steps still move you forward.</span>
        <span className="footer-note">React · Redux Toolkit · async thunk</span>
      </footer>
    </main>
  )
}

export default App
