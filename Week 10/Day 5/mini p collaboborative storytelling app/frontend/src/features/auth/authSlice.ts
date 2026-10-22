import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { AuthResponse, User } from '../../../../types/types'
import { apiRequest } from '../../app/api'
import type { RootState } from '../../app/store'

interface Credentials {
  email: string
  password: string
}

interface Registration extends Credentials {
  username: string
}

interface AuthState {
  user: User | null
  accessToken: string | null
  status: 'checking' | 'authenticated' | 'guest'
  error: string | null
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  status: 'checking',
  error: null,
}

export const restoreSession = createAsyncThunk<AuthResponse, void, { rejectValue: string }>(
  'auth/restore',
  async (_, { rejectWithValue }) => {
    try {
      return await apiRequest<AuthResponse>('/auth/refresh', {
        method: 'POST',
        refreshOnUnauthorized: false,
      })
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Session could not be restored.')
    }
  },
)

export const signIn = createAsyncThunk<AuthResponse, Credentials, { rejectValue: string }>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      return await apiRequest<AuthResponse>('/auth/login', {
        method: 'POST',
        body: credentials,
        refreshOnUnauthorized: false,
      })
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Sign in failed.')
    }
  },
)

export const signUp = createAsyncThunk<AuthResponse, Registration, { rejectValue: string }>(
  'auth/register',
  async (details, { rejectWithValue }) => {
    try {
      return await apiRequest<AuthResponse>('/auth/register', {
        method: 'POST',
        body: details,
        refreshOnUnauthorized: false,
      })
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Account creation failed.')
    }
  },
)

export const signOut = createAsyncThunk<void, void, { state: RootState }>(
  'auth/logout',
  async (_, { getState }) => {
    const token = getState().auth.accessToken
    await apiRequest<void>('/auth/logout', { method: 'POST', token, refreshOnUnauthorized: false })
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAccessToken(state, action: { payload: string }) {
      state.accessToken = action.payload
    },
    clearAuth(state) {
      state.user = null
      state.accessToken = null
      state.status = 'guest'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.accessToken = action.payload.accessToken
        state.status = 'authenticated'
        state.error = null
      })
      .addCase(restoreSession.rejected, (state) => {
        state.status = 'guest'
        state.accessToken = null
      })
      .addCase(signIn.pending, (state) => { state.error = null })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.accessToken = action.payload.accessToken
        state.status = 'authenticated'
        state.error = null
      })
      .addCase(signIn.rejected, (state, action) => { state.error = action.payload ?? 'Sign in failed.' })
      .addCase(signUp.pending, (state) => { state.error = null })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.accessToken = action.payload.accessToken
        state.status = 'authenticated'
        state.error = null
      })
      .addCase(signUp.rejected, (state, action) => { state.error = action.payload ?? 'Account creation failed.' })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null
        state.accessToken = null
        state.status = 'guest'
        state.error = null
      })
  },
})

export const { updateAccessToken, clearAuth } = authSlice.actions
export default authSlice.reducer
