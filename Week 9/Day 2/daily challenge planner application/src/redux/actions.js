export const ADD_TASK = 'planner/addTask'
export const EDIT_TASK = 'planner/editTask'
export const DELETE_TASK = 'planner/deleteTask'
export const CLEAR_ERROR = 'planner/clearError'
export const PERSISTENCE_ERROR = 'planner/persistenceError'

export const addTask = (date, task) => ({
  type: ADD_TASK,
  payload: {
    date,
    task: { ...task, id: globalThis.crypto.randomUUID() },
  },
})

export const editTask = (date, taskId, updates) => ({
  type: EDIT_TASK,
  payload: { date, taskId, updates },
})

export const deleteTask = (date, taskId) => ({
  type: DELETE_TASK,
  payload: { date, taskId },
})

export const clearError = () => ({ type: CLEAR_ERROR })
export const persistenceError = (message) => ({ type: PERSISTENCE_ERROR, payload: message })
