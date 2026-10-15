import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (userId, { rejectWithValue }) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)

    if (!response.ok) {
      return rejectWithValue(`Unable to fetch user ${userId} (HTTP ${response.status}).`)
    }

    return response.json()
  },
)

const initialState = {
  user: null,
  status: 'idle',
  error: null,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload
        state.error = null
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = 'failed'
        state.user = null
        state.error = action.payload ?? action.error.message ?? 'An unexpected error occurred.'
      })
  },
})

export default usersSlice.reducer
