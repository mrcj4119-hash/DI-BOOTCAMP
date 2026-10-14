import { useDispatch } from 'react-redux'
import { editTask } from '../features/planner/plannerSlice.js'
import TaskForm from './TaskForm.jsx'

function EditTask({ date, task, onCancel, onSaved }) {
  const dispatch = useDispatch()

  function saveChanges(updates) {
    dispatch(editTask({ date, taskId: task.id, updates }))
    onSaved()
  }

  return (
    <TaskForm
      key={task.id}
      initialTask={task}
      submitLabel="Save changes"
      onSave={saveChanges}
      onCancel={onCancel}
    />
  )
}

export default EditTask
