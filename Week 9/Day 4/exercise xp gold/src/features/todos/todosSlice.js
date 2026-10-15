import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=6')

    if (!response.ok) {
      return rejectWithValue(`Unable to fetch todos (HTTP ${response.status}).`)
    }

    return response.json()
  },
  {
    condition: (_, { getState }) => getState().todos.status !== 'loading',
  },
)

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  nextId: 1,
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.items.unshift({
        id: `local-${state.nextId}`,
        title: action.payload,
        completed: false,
      })
      state.nextId += 1
    },
    removeTodo: (state, action) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload)
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find((item) => item.id === action.payload)

      if (todo) {
        todo.completed = !todo.completed
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = [
          ...action.payload,
          ...state.items.filter((todo) => String(todo.id).startsWith('local-')),
        ]
        state.nextId = Math.max(0, ...action.payload.map((todo) => todo.id)) + 1
        state.error = null
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? action.error.message ?? 'An unexpected error occurred.'
      })
  },
})

export const { addTodo, removeTodo, toggleTodo } = todosSlice.actions
export default todosSlice.reducer
