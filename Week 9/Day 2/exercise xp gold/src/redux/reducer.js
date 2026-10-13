import { ADD_CATEGORY, ADD_TODO, CLEAR_ERROR, REMOVE_TODO, TOGGLE_TODO } from './actions.js'

const starterCategories = [
  { id: 'work', name: 'Work', tone: 'sage' },
  { id: 'personal', name: 'Personal', tone: 'peach' },
  { id: 'learning', name: 'Learning', tone: 'lavender' },
]

const initialState = {
  categories: starterCategories,
  todosByCategory: {
    work: [],
    personal: [],
    learning: [],
  },
  error: '',
}

function findCategory(state, categoryId) {
  return state.categories.some((category) => category.id === categoryId)
}

export function todoReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CATEGORY: {
      const name = action.payload.name.trim()
      if (!name) return { ...state, error: 'Give your category a name first.' }
      if (state.categories.some((category) => category.name.toLowerCase() === name.toLowerCase())) {
        return { ...state, error: 'That category already exists.' }
      }

      const tones = ['sage', 'peach', 'lavender', 'blue', 'butter']
      const tone = tones[state.categories.length % tones.length]
      return {
        ...state,
        categories: [...state.categories, { id: action.payload.id, name, tone }],
        todosByCategory: { ...state.todosByCategory, [action.payload.id]: [] },
        error: '',
      }
    }
    case ADD_TODO: {
      const { categoryId, ...todo } = action.payload
      if (!findCategory(state, categoryId)) {
        return { ...state, error: 'That category could not be found. Choose a category and try again.' }
      }
      return {
        ...state,
        todosByCategory: {
          ...state.todosByCategory,
          [categoryId]: [...state.todosByCategory[categoryId], { ...todo, completed: false }],
        },
        error: '',
      }
    }
    case TOGGLE_TODO:
    case REMOVE_TODO: {
      const { categoryId, todoId } = action.payload
      if (!findCategory(state, categoryId)) {
        return { ...state, error: 'That category could not be found.' }
      }
      const categoryTodos = state.todosByCategory[categoryId]
      if (!categoryTodos.some((todo) => todo.id === todoId)) {
        return { ...state, error: 'That task could not be found in this category.' }
      }

      const updatedTodos = action.type === TOGGLE_TODO
        ? categoryTodos.map((todo) => (
          todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
        ))
        : categoryTodos.filter((todo) => todo.id !== todoId)

      return {
        ...state,
        todosByCategory: { ...state.todosByCategory, [categoryId]: updatedTodos },
        error: '',
      }
    }
    case CLEAR_ERROR:
      return { ...state, error: '' }
    default:
      return state
  }
}
