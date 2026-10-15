import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const API_BASE = 'https://jsonplaceholder.typicode.com'

const initialState = {
  users: [],
  selectedUser: null,
  selectedUserId: 1,
  status: 'idle',
  error: null,
  todos: [],
  todoStatus: 'idle',
  todoError: null,
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_BASE}/users`)

    if (!response.ok) {
      throw new Error('Unable to fetch users.')
    }

    return response.json()
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (userId, { rejectWithValue }) => {
    try {
      const [userResponse, todosResponse] = await Promise.all([
        fetch(`${API_BASE}/users/${userId}`),
        fetch(`${API_BASE}/todos?userId=${userId}`),
      ])

      if (!userResponse.ok || !todosResponse.ok) {
        throw new Error('Unable to fetch the selected user.')
      }

      const user = await userResponse.json()
      const todos = await todosResponse.json()

      return { user, todos }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  },
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUserId: (state, action) => {
      state.selectedUserId = action.payload
    },
    addTodo: (state, action) => {
      const todo = {
        id: Date.now(),
        title: action.payload,
        completed: false,
      }
      state.todos = [todo, ...state.todos]
    },
    toggleTodo: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo,
      )
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = action.payload
        state.selectedUser = action.payload[0] || null
        state.selectedUserId = action.payload[0]?.id || 1
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Failed to load users.'
      })
      .addCase(fetchUserById.pending, (state) => {
        state.todoStatus = 'loading'
        state.todoError = null
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.todoStatus = 'succeeded'
        state.selectedUser = action.payload.user
        state.todos = action.payload.todos
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.todoStatus = 'failed'
        state.todoError = action.payload || 'Failed to load this user.'
      })
  },
})

export const { setSelectedUserId, addTodo, toggleTodo, removeTodo } = usersSlice.actions

export default usersSlice.reducer
