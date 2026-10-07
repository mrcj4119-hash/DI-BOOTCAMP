import { useReducer, useState } from 'react'

function todoReducer(todos, action) {
  switch (action.type) {
    case 'added':
      return [...todos, action.todo]
    case 'removed':
      return todos.filter((todo) => todo.id !== action.id)
    default:
      throw new Error(`Unknown todo action: ${action.type}`)
  }
}

function App() {
  const [todos, dispatch] = useReducer(todoReducer, [])
  const [newTodo, setNewTodo] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const text = newTodo.trim()

    if (!text) {
      return
    }

    dispatch({
      type: 'added',
      todo: {
        id: crypto.randomUUID(),
        text,
      },
    })
    setNewTodo('')
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">Week 8 · Day 3 · Exercise XP Gold</p>
        <h1>Your todo list</h1>
        <p className="intro-copy">Keep track of what you want to get done.</p>
      </header>

      <section className="todo-card" aria-labelledby="todo-heading">
        <div className="todo-card-heading">
          <div>
            <p className="card-kicker">useReducer</p>
            <h2 id="todo-heading">Tasks</h2>
          </div>
          <span className="todo-count" aria-label={`${todos.length} tasks`}>
            {todos.length}
          </span>
        </div>

        <form className="todo-form" onSubmit={handleSubmit}>
          <label className="visually-hidden" htmlFor="new-todo">Add a task</label>
          <input
            id="new-todo"
            className="todo-input"
            type="text"
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
            placeholder="What needs to get done?"
            autoComplete="off"
          />
          <button className="add-button" type="submit" disabled={!newTodo.trim()}>
            Add task
          </button>
        </form>

        {todos.length === 0 ? (
          <p className="empty-state">Your list is clear. Add a task to get started.</p>
        ) : (
          <ul className="todo-list" aria-label="Todo items">
            {todos.map((todo) => (
              <li className="todo-item" key={todo.id}>
                <span className="todo-marker" aria-hidden="true" />
                <span className="todo-text">{todo.text}</span>
                <button
                  className="remove-button"
                  type="button"
                  aria-label={`Remove ${todo.text}`}
                  onClick={() => dispatch({ type: 'removed', id: todo.id })}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
      <footer className="page-footer">
        Add and remove tasks to see the reducer update your list.
      </footer>
    </main>
  )
}

export default App
