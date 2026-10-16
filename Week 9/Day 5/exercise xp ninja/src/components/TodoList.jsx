import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectFilteredTodosCount,
  selectTodos,
  selectVisibilityFilter,
} from '../features/todos/todosSelectors.js'
import {
  addTodo,
  removeTodo,
  setVisibilityFilter,
  toggleTodo,
} from '../features/todos/todosSlice.js'
import '../App.css'

const filters = ['All', 'Active', 'Completed']

function TodoList() {
  const dispatch = useDispatch()
  const todos = useSelector(selectTodos)
  const visibilityFilter = useSelector(selectVisibilityFilter)
  const filteredCount = useSelector(selectFilteredTodosCount)
  const [newTodo, setNewTodo] = useState('')

  const handleToggle = useCallback((todoId) => {
    dispatch(toggleTodo(todoId))
  }, [dispatch])

  const handleDelete = useCallback((todoId) => {
    dispatch(removeTodo(todoId))
  }, [dispatch])

  const handleFilterChange = useCallback((filter) => {
    dispatch(setVisibilityFilter(filter))
  }, [dispatch])

  const handleSubmit = (event) => {
    event.preventDefault()
    const text = newTodo.trim()

    if (text) {
      dispatch(addTodo(text))
      setNewTodo('')
    }
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Daymark home">
          <span className="brand-mark" aria-hidden="true">d.</span>
          daymark
        </a>
        <span className="topbar-note">A softer way to get things done.</span>
      </header>

      <section className="intro" aria-labelledby="page-title">
        <div>
          <p className="eyebrow">WEEK 9 · DAY 5 · REDUX PERFORMANCE</p>
          <h1 id="page-title">
            Make space for
            <br />
            <span>what matters.</span>
          </h1>
          <p className="intro-description">
            Gather your thoughts, find your focus, and take today one small
            thing at a time.
          </p>
        </div>
        <div className="intro-note" aria-hidden="true">
          <span>ONE THING</span>
          <strong>at a time</strong>
          <span className="note-spark">✳</span>
        </div>
      </section>

      <section className="todo-panel" aria-labelledby="todo-heading">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">YOUR DAY, YOUR PACE</p>
            <h2 id="todo-heading">A little list</h2>
          </div>
          <span className="task-count">
            <strong>{filteredCount}</strong> {filteredCount === 1 ? 'task' : 'tasks'}
          </span>
        </div>

        <form className="add-form" onSubmit={handleSubmit}>
          <label className="visually-hidden" htmlFor="new-todo">Add a task</label>
          <span className="add-symbol" aria-hidden="true">+</span>
          <input
            autoComplete="off"
            id="new-todo"
            onChange={(event) => setNewTodo(event.target.value)}
            placeholder="Add something to your day..."
            value={newTodo}
          />
          <button disabled={!newTodo.trim()} type="submit">Add task</button>
        </form>

        <div className="list-toolbar">
          <div className="filter-tabs" role="group" aria-label="Filter tasks">
            {filters.map((filter) => (
              <button
                aria-pressed={visibilityFilter === filter}
                className={`filter-tab${visibilityFilter === filter ? ' is-active' : ''}`}
                key={filter}
                onClick={() => handleFilterChange(filter)}
                type="button"
              >
                {filter}
              </button>
            ))}
          </div>
          <span className="selector-label">
            <span className="selector-dot" aria-hidden="true" />
            Memoized view
          </span>
        </div>

        {todos.length === 0 ? (
          <div className="empty-state" aria-live="polite">
            <span aria-hidden="true">✳</span>
            <p>{visibilityFilter === 'Completed' ? 'No completed tasks just yet.' : 'All clear for now.'}</p>
            <span>{visibilityFilter === 'Completed' ? 'Finished tasks will find their way here.' : 'Add a task or switch to another view.'}</span>
          </div>
        ) : (
          <ul className="todo-items" aria-live="polite">
            {todos.map((todo) => (
              <li className={`todo-item${todo.completed ? ' is-complete' : ''}`} key={todo.id}>
                <label className="todo-label">
                  <input
                    checked={todo.completed}
                    onChange={() => handleToggle(todo.id)}
                    type="checkbox"
                  />
                  <span className="custom-check" aria-hidden="true">
                    {todo.completed ? '✓' : ''}
                  </span>
                  <span className="todo-text">{todo.text}</span>
                </label>
                <span className={`todo-status${todo.completed ? ' status-done' : ''}`}>
                  {todo.completed ? 'Done' : 'In progress'}
                </span>
                <button
                  aria-label={`Delete ${todo.text}`}
                  className="delete-button"
                  onClick={() => handleDelete(todo.id)}
                  type="button"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="panel-footer">
          <span>Small steps still move you forward.</span>
          <span>Showing {filteredCount} {filteredCount === 1 ? 'task' : 'tasks'}</span>
        </div>
      </section>

      <footer className="page-footer">
        <span>React + Redux Toolkit + React Redux</span>
        <span>Less rush, more intention.</span>
      </footer>
    </main>
  )
}

export default TodoList
