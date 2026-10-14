import { useDispatch } from 'react-redux'
import { deleteTask } from '../features/planner/plannerSlice.js'

function DeleteTask({ date, task, onDeleted }) {
  const dispatch = useDispatch()

  function handleDelete() {
    dispatch(deleteTask({ date, taskId: task.id }))
    onDeleted(task.id)
  }

  return (
    <button
      className="delete-action"
      type="button"
      aria-label={`Delete ${task.title}`}
      onClick={handleDelete}
    >
      Delete
    </button>
  )
}

export default DeleteTask
