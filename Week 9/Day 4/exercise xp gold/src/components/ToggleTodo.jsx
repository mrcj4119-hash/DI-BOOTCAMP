import { useDispatch } from 'react-redux'
import { toggleTodo } from '../features/todos/todosSlice.js'

function ToggleTodo({ id, completed, title }) {
  const dispatch = useDispatch()

  return (
    <button
      className="todo-toggle"
      type="button"
      aria-label={`${completed ? 'Mark as active' : 'Mark as complete'}: ${title}`}
      aria-pressed={completed}
      onClick={() => dispatch(toggleTodo(id))}
    >
      {completed && <span aria-hidden="true">✓</span>}
    </button>
  )
}

export default ToggleTodo
