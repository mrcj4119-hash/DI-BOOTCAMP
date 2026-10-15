import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos } from '../features/todos/todosSlice.js'
import TodoItem from './TodoItem.jsx'

function TodoList() {
  const dispatch = useDispatch()
  const { items, status, error } = useSelector((state) => state.todos)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos())
    }
  }, [dispatch, status])

  const completedCount = items.filter((todo) => todo.completed).length

  return (
    <div className="todo-list">
      <div className="list-heading">
        <h2>Your list</h2>
        <span className="list-summary">
          {completedCount} of {items.length} complete
        </span>
      </div>

      {status === 'loading' && (
        <div className="fetch-status" role="status">
          <span className="loading-dot" aria-hidden="true" />
          Fetching your list…
        </div>
      )}

      {status === 'failed' && (
        <div className="error-state" role="alert">
          <strong>We couldn’t load the starter list.</strong>
          <p>{error}</p>
          <button
            className="retry-button"
            type="button"
            onClick={() => dispatch(fetchTodos())}
          >
            Try again
          </button>
        </div>
      )}

      {items.length > 0 ? (
        <ul className="todo-items">
          {items.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      ) : status !== 'loading' && status !== 'failed' ? (
        <div className="empty-state">
          <strong>Your list is clear.</strong>
          <p>Add a task above when you’re ready.</p>
        </div>
      ) : null}
    </div>
  )
}

export default TodoList
