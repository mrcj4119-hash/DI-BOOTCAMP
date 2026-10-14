import { useDispatch } from 'react-redux'
import { removeTodo, toggleTodo } from '../features/todos/todosSlice.js'

function TodoItem({ todo }) {
  const dispatch = useDispatch()

  return (
    <li className={`todo-item${todo.completed ? ' is-complete' : ''}`}>
      <button
        className="todo-toggle"
        type="button"
        aria-label={`${todo.completed ? 'Mark' : 'Complete'} "${todo.text}"`}
        aria-pressed={todo.completed}
        onClick={() => dispatch(toggleTodo(todo.id))}
      >
        <span className="checkmark" aria-hidden="true">
          {todo.completed ? '✓' : ''}
        </span>
        <span className="todo-text">{todo.text}</span>
      </button>
      <button
        className="remove-button"
        type="button"
        aria-label={`Remove "${todo.text}"`}
        onClick={() => dispatch(removeTodo(todo.id))}
      >
        Remove
      </button>
    </li>
  )
}

export default TodoItem
