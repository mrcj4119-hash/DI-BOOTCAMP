import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import { ADD_TASK, DELETE_TASK, EDIT_TASK, persistenceError } from './actions.js'
import { plannerReducer } from './reducer.js'
import { loadTasks, saveTasks } from './storage.js'

function loadInitialState() {
  try {
    return { tasksByDate: loadTasks(), error: '' }
  } catch (error) {
    return {
      tasksByDate: {},
      error: error instanceof Error ? error.message : 'Saved planner data could not be loaded.',
    }
  }
}

const persistPlanner = (store) => (next) => (action) => {
  const result = next(action)
  if ([ADD_TASK, EDIT_TASK, DELETE_TASK].includes(action.type)) {
    try {
      saveTasks(store.getState().tasksByDate)
    } catch (error) {
      store.dispatch(persistenceError(
        error instanceof Error ? error.message : 'Planner changes could not be saved.',
      ))
    }
  }
  return result
}

export const store = createStore(plannerReducer, loadInitialState(), applyMiddleware(persistPlanner))
