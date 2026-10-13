import {
  ADD_TODO,
  AUTH_ANONYMOUS,
  AUTH_CHECKING,
  AUTH_FAILURE,
  AUTH_REQUEST,
  CLEAR_TODOS_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_SUCCESS,
  REMOVE_TODO,
  TODOS_SAVE_FAILED,
  TOGGLE_TODO,
} from './actions.js'

export const initialAuthState = {
  status: 'checking',
  user: null,
  token: null,
  error: '',
}

export function authReducer(state = initialAuthState, action) {
  switch (action.type) {
    case AUTH_CHECKING:
      return { ...state, status: 'checking', error: '' }
    case AUTH_REQUEST:
      return { ...state, status: 'submitting', error: '' }
    case AUTH_FAILURE:
      return { ...state, status: state.user ? 'authenticated' : 'anonymous', error: action.payload }
    case AUTH_ANONYMOUS:
    case LOGOUT:
      return { ...initialAuthState, status: 'anonymous' }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        status: 'authenticated',
        user: action.payload.user,
        token: action.payload.token,
        error: '',
      }
    default:
      return state
  }
}

const initialTodosState = {
  items: [],
  error: '',
}

export function todosReducer(state = initialTodosState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return { items: action.payload.todos, error: '' }
    case LOGOUT:
      return initialTodosState
    case ADD_TODO:
      return { ...state, items: [...state.items, { ...action.payload, completed: false }], error: '' }
    case TOGGLE_TODO:
      return {
        ...state,
        items: state.items.map((todo) => (
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        )),
        error: '',
      }
    case REMOVE_TODO:
      return { ...state, items: state.items.filter((todo) => todo.id !== action.payload), error: '' }
    case TODOS_SAVE_FAILED:
      return { ...state, error: action.payload }
    case CLEAR_TODOS_ERROR:
      return { ...state, error: '' }
    default:
      return state
  }
}
