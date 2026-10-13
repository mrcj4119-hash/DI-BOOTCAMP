import { ADD_TASK, CLEAR_ERROR, DELETE_TASK, EDIT_TASK, PERSISTENCE_ERROR } from './actions.js'

export const initialState = {
  tasksByDate: {},
  error: '',
}

function isValidDateKey(date) {
  if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return false
  const parsedDate = new Date(`${date}T00:00:00.000Z`)
  return !Number.isNaN(parsedDate.valueOf()) && parsedDate.toISOString().slice(0, 10) === date
}

function hasTask(state, date, taskId) {
  return (state.tasksByDate[date] || []).some((task) => task.id === taskId)
}

export function plannerReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK: {
      const { date, task } = action.payload
      if (!isValidDateKey(date)) return { ...state, error: 'Choose a valid day for your task.' }
      if (!task.title?.trim()) return { ...state, error: 'Give your task a name before saving.' }
      return {
        ...state,
        tasksByDate: {
          ...state.tasksByDate,
          [date]: [...(state.tasksByDate[date] || []), { ...task, title: task.title.trim() }],
        },
        error: '',
      }
    }
    case EDIT_TASK: {
      const { date, taskId, updates } = action.payload
      if (!isValidDateKey(date)) return { ...state, error: 'Choose a valid day for your task.' }
      if (!hasTask(state, date, taskId)) return { ...state, error: 'That task could not be found on this day.' }
      if (!updates.title?.trim()) return { ...state, error: 'A task name cannot be empty.' }
      return {
        ...state,
        tasksByDate: {
          ...state.tasksByDate,
          [date]: state.tasksByDate[date].map((task) => (
            task.id === taskId ? { ...task, ...updates, title: updates.title.trim() } : task
          )),
        },
        error: '',
      }
    }
    case DELETE_TASK: {
      const { date, taskId } = action.payload
      if (!isValidDateKey(date)) return { ...state, error: 'Choose a valid day for your task.' }
      if (!hasTask(state, date, taskId)) return { ...state, error: 'That task could not be found on this day.' }
      return {
        ...state,
        tasksByDate: {
          ...state.tasksByDate,
          [date]: state.tasksByDate[date].filter((task) => task.id !== taskId),
        },
        error: '',
      }
    }
    case PERSISTENCE_ERROR:
      return { ...state, error: action.payload }
    case CLEAR_ERROR:
      return { ...state, error: '' }
    default:
      return state
  }
}
