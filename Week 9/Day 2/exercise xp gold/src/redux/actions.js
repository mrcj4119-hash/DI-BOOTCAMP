export const ADD_CATEGORY = 'categories/add'
export const ADD_TODO = 'todos/add'
export const TOGGLE_TODO = 'todos/toggle'
export const REMOVE_TODO = 'todos/remove'
export const CLEAR_ERROR = 'todos/clearError'

export const addCategory = (name) => ({
  type: ADD_CATEGORY,
  payload: { id: globalThis.crypto.randomUUID(), name },
})

export const addTodo = (categoryId, text) => ({
  type: ADD_TODO,
  payload: { id: globalThis.crypto.randomUUID(), categoryId, text },
})

export const toggleTodo = (categoryId, todoId) => ({
  type: TOGGLE_TODO,
  payload: { categoryId, todoId },
})

export const removeTodo = (categoryId, todoId) => ({
  type: REMOVE_TODO,
  payload: { categoryId, todoId },
})

export const clearError = () => ({ type: CLEAR_ERROR })
