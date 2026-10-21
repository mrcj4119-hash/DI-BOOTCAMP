import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { DataState } from '../types/types'

const initialState: DataState = {
  status: 'idle',
  data: null,
  error: null,
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    requestStarted(state) {
      state.status = 'loading'
      state.data = null
      state.error = null
    },
    requestSucceeded(state, action: PayloadAction<unknown>) {
      state.status = 'success'
      state.data = action.payload
      state.error = null
    },
    requestFailed(state, action: PayloadAction<string>) {
      state.status = 'error'
      state.data = null
      state.error = action.payload
    },
  },
})

export const { requestStarted, requestSucceeded, requestFailed } = dataSlice.actions
export default dataSlice.reducer
