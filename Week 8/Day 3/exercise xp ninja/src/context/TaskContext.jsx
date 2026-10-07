import { createContext, useContext, useReducer } from 'react'

const TaskContext = createContext(null)

function taskReducer(tasks, action) {
  switch (action.type) {
    case 'added':
      return [...tasks, action.task]
    case 'toggled':
      return tasks.map((task) =>
        task.id === action.id ? { ...task, completed: !task.completed } : task,
      )
    case 'removed':
      return tasks.filter((task) => task.id !== action.id)
    default:
      throw new Error(`Unknown task action: ${action.type}`)
  }
}

export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, [])

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
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
