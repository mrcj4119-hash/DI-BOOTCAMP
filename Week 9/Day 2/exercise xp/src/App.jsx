import { useState } from 'react'
import { connect } from 'react-redux'
import { addTodo, removeTodo, toggleTodo } from './redux/actions.js'
import './App.css'

const filters = ['all', 'active', 'completed']

function TodoApp({ todos, onAddTodo, onToggleTodo, onRemoveTodo }) {
  const [filter, setFilter] = useState('all')
  const completedCount = todos.filter((todo) => todo.completed).length
  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const text = formData.get('todo')

    if (typeof text === 'string' && text.trim()) {
      onAddTodo(text.trim())
      event.currentTarget.reset()
    }
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Little List home">
          <span className="brand-mark" aria-hidden="true">l.</span>
          <span>little list</span>
        </a>
        <span className="course-label">WEEK 9 <span aria-hidden="true">/</span> DAY 2</span>
      </header>

      <section className="todo-card" aria-labelledby="page-title">
        <div className="card-heading">
          <div>
            <p className="eyebrow">A little progress goes a long way</p>
            <h1 id="page-title">Make room for<br /><span>what matters.</span></h1>
          </div>
          <div className="progress-badge" aria-label={`${completedCount} of ${todos.length} tasks complete`}>
            <span className="progress-number">{String(completedCount).padStart(2, '0')}</span>
            <span className="progress-divider" />
            <span className="progress-total">{String(todos.length).padStart(2, '0')}</span>
            <span className="progress-caption">DONE</span>
          </div>
        </div>

        <form className="add-form" onSubmit={handleSubmit}>
          <label className="visually-hidden" htmlFor="new-todo">Add a task</label>
          <span className="add-icon" aria-hidden="true">+</span>
          <input
            id="new-todo"
            name="todo"
            type="text"
            placeholder="Add something to your list..."
            autoComplete="off"
            maxLength={120}
          />
          <button type="submit">Add task <span aria-hidden="true">↗</span></button>
        </form>

        <div className="list-toolbar">
          <h2>Your tasks <span>{todos.length}</span></h2>
          <div className="filter-list" aria-label="Filter tasks">
            {filters.map((filterOption) => (
              <button
                key={filterOption}
                className={filter === filterOption ? 'filter-button is-selected' : 'filter-button'}
                type="button"
                aria-pressed={filter === filterOption}
                onClick={() => setFilter(filterOption)}
              >
                {filterOption}
              </button>
            ))}
          </div>
        </div>

        {visibleTodos.length > 0 ? (
          <ul className="todo-list">
            {visibleTodos.map((todo) => (
              <li className={todo.completed ? 'todo-row is-complete' : 'todo-row'} key={todo.id}>
                <button
                  className="toggle-button"
                  type="button"
                  aria-label={todo.completed ? `Mark ${todo.text} as active` : `Complete ${todo.text}`}
                  aria-pressed={todo.completed}
                  onClick={() => onToggleTodo(todo.id)}
                >
                  {todo.completed && <span aria-hidden="true">✓</span>}
                </button>
                <span className="todo-text">{todo.text}</span>
                <button
                  className="remove-button"
                  type="button"
                  aria-label={`Remove ${todo.text}`}
                  onClick={() => onRemoveTodo(todo.id)}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state" role="status">
            <span className="empty-mark" aria-hidden="true">✓</span>
            <p>{todos.length === 0 ? 'Your list is a blank page.' : `No ${filter} tasks right now.`}</p>
            <span>{todos.length === 0 ? 'Add a task above to get started.' : 'Try another filter to see your tasks.'}</span>
          </div>
        )}

        <footer className="card-footer">
          <span>ONE THING AT A TIME</span>
          <span>YOU’VE GOT THIS <span className="footer-sparkle" aria-hidden="true">✳</span></span>
        </footer>
      </section>

      <p className="page-note">A calmer way to keep track of today.</p>
    </main>
  )
}

const mapStateToProps = (state) => ({
  todos: state.todos,
})

const mapDispatchToProps = {
  onAddTodo: addTodo,
  onToggleTodo: toggleTodo,
  onRemoveTodo: removeTodo,
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
