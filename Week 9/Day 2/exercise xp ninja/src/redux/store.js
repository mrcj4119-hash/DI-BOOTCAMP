import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import {
  ADD_TODO,
  REMOVE_TODO,
  TOGGLE_TODO,
  todosSaveFailed,
} from './actions.js'
import { authReducer, todosReducer } from './reducers.js'
import { authService } from './authService.js'

const rootReducer = combineReducers({
  auth: authReducer,
  todos: todosReducer,
})

const persistTodos = (store) => (next) => (action) => {
  const result = next(action)

  if ([ADD_TODO, TOGGLE_TODO, REMOVE_TODO].includes(action.type)) {
    const { auth, todos } = store.getState()
    if (auth.user) {
      try {
        authService.saveTodos(auth.user.id, todos.items)
      } catch (error) {
        if (error instanceof Error) {
          store.dispatch(todosSaveFailed(error.message))
        } else {
          store.dispatch(todosSaveFailed('Tasks could not be saved. Please try again.'))
        }
      }
    }
  }

  return result
}

export const store = createStore(rootReducer, applyMiddleware(persistTodos))
