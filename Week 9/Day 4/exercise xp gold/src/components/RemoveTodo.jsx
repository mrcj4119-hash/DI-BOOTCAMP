import { useDispatch } from 'react-redux'
import { removeTodo } from '../features/todos/todosSlice.js'

function RemoveTodo({ id, title }) {
  const dispatch = useDispatch()

  return (
    <button
      className="remove-todo"
      type="button"
      aria-label={`Remove: ${title}`}
      onClick={() => dispatch(removeTodo(id))}
    >
      <span aria-hidden="true">×</span>
    </button>
  )
}

export default RemoveTodo
