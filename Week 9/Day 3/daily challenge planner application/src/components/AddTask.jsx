import { useDispatch } from 'react-redux'
import { addTask } from '../features/planner/plannerSlice.js'
import TaskForm from './TaskForm.jsx'

function AddTask({ date, onCancel, onSaved }) {
  const dispatch = useDispatch()

  function saveTask(taskDetails) {
    dispatch(
      addTask({
        date,
        task: {
          id: crypto.randomUUID(),
          ...taskDetails,
        },
      }),
    )
    onSaved()
  }

  return (
    <TaskForm
      submitLabel="Add to my day"
      onSave={saveTask}
      onCancel={onCancel}
    />
  )
}

export default AddTask
