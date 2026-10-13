export const AUTH_CHECKING = 'auth/checking'
export const AUTH_REQUEST = 'auth/request'
export const AUTH_FAILURE = 'auth/failure'
export const AUTH_ANONYMOUS = 'auth/anonymous'
export const LOGIN_SUCCESS = 'auth/loginSuccess'
export const REGISTER_SUCCESS = 'auth/registerSuccess'
export const LOGOUT = 'auth/logout'
export const ADD_TODO = 'todos/add'
export const TOGGLE_TODO = 'todos/toggle'
export const REMOVE_TODO = 'todos/remove'
export const CLEAR_TODOS_ERROR = 'todos/clearError'
export const TODOS_SAVE_FAILED = 'todos/saveFailed'

export const authChecking = () => ({ type: AUTH_CHECKING })
export const authRequest = () => ({ type: AUTH_REQUEST })
export const authFailure = (message) => ({ type: AUTH_FAILURE, payload: message })
export const authAnonymous = () => ({ type: AUTH_ANONYMOUS })
export const loginSuccess = (session) => ({ type: LOGIN_SUCCESS, payload: session })
export const registerSuccess = (session) => ({ type: REGISTER_SUCCESS, payload: session })
export const logout = () => ({ type: LOGOUT })
export const addTodo = (text) => ({
  type: ADD_TODO,
  payload: { id: globalThis.crypto.randomUUID(), text },
})
export const toggleTodo = (id) => ({ type: TOGGLE_TODO, payload: id })
export const removeTodo = (id) => ({ type: REMOVE_TODO, payload: id })
export const clearTodosError = () => ({ type: CLEAR_TODOS_ERROR })
export const todosSaveFailed = (message) => ({ type: TODOS_SAVE_FAILED, payload: message })
