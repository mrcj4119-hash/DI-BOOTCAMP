import { useTasks } from '../context/TaskContext.jsx'
import TaskItem from './TaskItem.jsx'

function TaskList() {
  const { tasks } = useTasks()

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">✓</span>
        <p>No tasks yet</p>
        <span>Add a task above and it’ll show up here.</span>
      </div>
    )
  }

  return (
    <ul className="task-list" aria-label="Tasks">
      {tasks.map((task) => <TaskItem key={task.id} task={task} />)}
    </ul>
  )
}

export default TaskList
