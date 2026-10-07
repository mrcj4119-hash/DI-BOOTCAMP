import { useTasks } from '../context/TaskContext.jsx'

const filters = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
]

function TaskFilters() {
  const { filter, dispatch } = useTasks()

  return (
    <div className="filters" aria-label="Filter tasks">
      {filters.map((option) => (
        <button
          key={option.value}
          className={`filter-button${filter === option.value ? ' is-selected' : ''}`}
          type="button"
          aria-pressed={filter === option.value}
          onClick={() => dispatch({ type: 'filter-changed', filter: option.value })}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default TaskFilters
