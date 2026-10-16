import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  items: [
    { id: 'todo-1', text: 'Water the balcony plants', completed: false },
    { id: 'todo-2', text: 'Send the project update', completed: false },
    { id: 'todo-3', text: 'Pick up a few groceries', completed: true },
    { id: 'todo-4', text: 'Make a little time to read', completed: false },
    { id: 'todo-5', text: 'Tidy up the workspace', completed: true },
  ],
  visibilityFilter: 'All',
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.items.push(action.payload)
      },
      prepare: (text) => ({
        payload: { id: nanoid(), text, completed: false },
      }),
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find((item) => item.id === action.payload)

      if (todo) {
        todo.completed = !todo.completed
      }
    },
    removeTodo: (state, action) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload)
    },
    setVisibilityFilter: (state, action) => {
      state.visibilityFilter = action.payload
    },
  },
})

export const { addTodo, toggleTodo, removeTodo, setVisibilityFilter } = todosSlice.actions
export default todosSlice.reducer
