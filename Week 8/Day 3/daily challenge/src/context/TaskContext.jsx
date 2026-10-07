import { createContext, useContext, useReducer } from 'react'

const TaskContext = createContext(null)

function taskReducer(state, action) {
  switch (action.type) {
    case 'added':
      return { ...state, tasks: [...state.tasks, action.task] }
    case 'toggled':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, completed: !task.completed } : task,
        ),
      }
    case 'edited':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, text: action.text } : task,
        ),
      }
    case 'removed':
      return { ...state, tasks: state.tasks.filter((task) => task.id !== action.id) }
    case 'filter-changed':
      return { ...state, filter: action.filter }
    default:
      throw new Error(`Unknown task action: ${action.type}`)
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, { tasks: [], filter: 'all' })

  return (
    <TaskContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider.')
  }

  return context
}
