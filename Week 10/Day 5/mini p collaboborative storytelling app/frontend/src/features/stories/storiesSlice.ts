import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { Story, StoryComment } from '../../../../types/types'
import { apiRequest } from '../../app/api'
import type { RootState } from '../../app/store'
import { clearAuth, updateAccessToken } from '../auth/authSlice'

interface StoryInput {
  title: string
  content: string
}

interface AsyncConfig {
  state: RootState
  rejectValue: string
}

interface StoriesState {
  items: Story[]
  comments: Record<number, StoryComment[]>
  status: 'idle' | 'loading' | 'failed'
  saving: boolean
  error: string | null
}

const initialState: StoriesState = {
  items: [],
  comments: {},
  status: 'idle',
  saving: false,
  error: null,
}

async function authorizedRequest<T>(
  path: string,
  options: { method?: string; body?: unknown },
  thunk: { getState: () => RootState; dispatch: (action: unknown) => unknown },
): Promise<T> {
  const token = thunk.getState().auth.accessToken
  if (!token) throw new Error('Please sign in to continue.')

  try {
    return await apiRequest<T>(path, {
      ...options,
      token,
      onRefresh: (nextToken) => thunk.dispatch(updateAccessToken(nextToken)),
    })
  } catch (error) {
    if (error instanceof Error && error.message.includes('session has expired')) {
      thunk.dispatch(clearAuth())
    }
    throw error
  }
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Something went wrong. Please try again.'
}

export const loadStories = createAsyncThunk<Story[], void, AsyncConfig>(
  'stories/load',
  async (_, thunk) => {
    try {
      return await authorizedRequest<Story[]>('/stories', {}, thunk)
    } catch (error) {
      return thunk.rejectWithValue(errorMessage(error))
    }
  },
)

export const createStory = createAsyncThunk<Story, StoryInput, AsyncConfig>(
  'stories/create',
  async (input, thunk) => {
    try {
      return await authorizedRequest<Story>('/stories', { method: 'POST', body: input }, thunk)
    } catch (error) {
      return thunk.rejectWithValue(errorMessage(error))
    }
  },
)

export const updateStory = createAsyncThunk<Story, { id: number } & StoryInput, AsyncConfig>(
  'stories/update',
  async ({ id, ...input }, thunk) => {
    try {
      return await authorizedRequest<Story>(`/stories/${id}`, { method: 'PATCH', body: input }, thunk)
    } catch (error) {
      return thunk.rejectWithValue(errorMessage(error))
    }
  },
)

export const deleteStory = createAsyncThunk<number, number, AsyncConfig>(
  'stories/delete',
  async (id, thunk) => {
    try {
      await authorizedRequest<void>(`/stories/${id}`, { method: 'DELETE' }, thunk)
      return id
    } catch (error) {
      return thunk.rejectWithValue(errorMessage(error))
    }
  },
)

export const inviteContributor = createAsyncThunk<void, { storyId: number; email: string }, AsyncConfig>(
  'stories/inviteContributor',
  async ({ storyId, email }, thunk) => {
    try {
      await authorizedRequest('/contributors', {
        method: 'POST',
        body: { story_id: storyId, email },
      }, thunk)
      return undefined
    } catch (error) {
      return thunk.rejectWithValue(errorMessage(error))
    }
  },
)

export const removeContributor = createAsyncThunk<number, { contributorId: number; storyId: number }, AsyncConfig>(
  'stories/removeContributor',
  async ({ contributorId, storyId }, thunk) => {
    try {
      await authorizedRequest<void>(`/contributors/${contributorId}`, { method: 'DELETE' }, thunk)
      return storyId
    } catch (error) {
      return thunk.rejectWithValue(errorMessage(error))
    }
  },
)

export const loadComments = createAsyncThunk<{ storyId: number; comments: StoryComment[] }, number, AsyncConfig>(
  'stories/loadComments',
  async (storyId, thunk) => {
    try {
      const comments = await authorizedRequest<StoryComment[]>(`/comments/${storyId}`, {}, thunk)
      return { storyId, comments }
    } catch (error) {
      return thunk.rejectWithValue(errorMessage(error))
    }
  },
)

export const addComment = createAsyncThunk<StoryComment, { storyId: number; content: string }, AsyncConfig>(
  'stories/addComment',
  async ({ storyId, content }, thunk) => {
    try {
      return await authorizedRequest<StoryComment>(`/comments/${storyId}`, {
        method: 'POST',
        body: { content },
      }, thunk)
    } catch (error) {
      return thunk.rejectWithValue(errorMessage(error))
    }
  },
)

export const editComment = createAsyncThunk<StoryComment, { id: number; content: string }, AsyncConfig>('stories/editComment', async ({ id, content }, thunk) => { try { return await authorizedRequest<StoryComment>(`/comments/${id}`, { method: 'PATCH', body: { content } }, thunk) } catch (error) { return thunk.rejectWithValue(errorMessage(error)) } })
export const deleteComment = createAsyncThunk<number, number, AsyncConfig>('stories/deleteComment', async (id, thunk) => { try { await authorizedRequest<void>(`/comments/${id}`, { method: 'DELETE' }, thunk); return id } catch (error) { return thunk.rejectWithValue(errorMessage(error)) } })
export const reactToComment = createAsyncThunk<StoryComment, { id: number; reaction: string }, AsyncConfig>('stories/reactToComment', async ({ id, reaction }, thunk) => { try { return await authorizedRequest<StoryComment>(`/comments/${id}/reactions`, { method: 'POST', body: { reaction } }, thunk) } catch (error) { return thunk.rejectWithValue(errorMessage(error)) } })
export const setCommentsEnabled = createAsyncThunk<{ enabled: boolean }, { storyId: number; enabled: boolean }, AsyncConfig>('stories/setCommentsEnabled', async ({ storyId, enabled }, thunk) => { try { return await authorizedRequest<{ enabled: boolean }>(`/comments/settings/${storyId}`, { method: 'PATCH', body: { enabled } }, thunk) } catch (error) { return thunk.rejectWithValue(errorMessage(error)) } })

const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    clearStories(state) {
      state.items = []
      state.comments = {}
      state.status = 'idle'
      state.error = null
    },
    clearStoryError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadStories.pending, (state) => { state.status = 'loading'; state.error = null })
      .addCase(loadStories.fulfilled, (state, action) => { state.items = action.payload; state.status = 'idle' })
      .addCase(loadStories.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload ?? 'Stories could not be loaded.' })
      .addCase(createStory.pending, (state) => { state.saving = true; state.error = null })
      .addCase(createStory.fulfilled, (state, action) => { state.items.unshift(action.payload); state.saving = false })
      .addCase(createStory.rejected, (state, action) => { state.saving = false; state.error = action.payload ?? 'Story could not be created.' })
      .addCase(updateStory.pending, (state) => { state.saving = true; state.error = null })
      .addCase(updateStory.fulfilled, (state, action) => {
        state.items = state.items.map((story) => story.id === action.payload.id ? action.payload : story)
        state.saving = false
      })
      .addCase(updateStory.rejected, (state, action) => { state.saving = false; state.error = action.payload ?? 'Story could not be updated.' })
      .addCase(deleteStory.fulfilled, (state, action) => {
        state.items = state.items.filter((story) => story.id !== action.payload)
        delete state.comments[action.payload]
      })
      .addCase(deleteStory.rejected, (state, action) => { state.error = action.payload ?? 'Story could not be deleted.' })
      .addCase(loadComments.fulfilled, (state, action) => { state.comments[action.payload.storyId] = action.payload.comments })
      .addCase(loadComments.rejected, (state, action) => { state.error = action.payload ?? 'Comments could not be loaded.' })
      .addCase(addComment.fulfilled, (state, action) => {
        const comments = state.comments[action.payload.story_id] ?? []
        state.comments[action.payload.story_id] = [...comments, action.payload]
      })
      .addCase(addComment.rejected, (state, action) => { state.error = action.payload ?? 'Comment could not be added.' })
      .addCase(editComment.fulfilled, (state, action) => { const comments = state.comments[action.payload.story_id] ?? []; state.comments[action.payload.story_id] = comments.map((comment) => comment.id === action.payload.id ? action.payload : comment) })
      .addCase(deleteComment.fulfilled, (state, action) => { Object.keys(state.comments).forEach((storyId) => { state.comments[Number(storyId)] = state.comments[Number(storyId)].filter((comment) => comment.id !== action.payload) }) })
      .addCase(reactToComment.fulfilled, (state, action) => { const comments = state.comments[action.payload.story_id] ?? []; state.comments[action.payload.story_id] = comments.map((comment) => comment.id === action.payload.id ? action.payload : comment) })
      .addCase(inviteContributor.rejected, (state, action) => { state.error = action.payload ?? 'Contributor could not be invited.' })
      .addCase(removeContributor.rejected, (state, action) => { state.error = action.payload ?? 'Contributor could not be removed.' })
  },
})

export const { clearStories, clearStoryError } = storiesSlice.actions
export default storiesSlice.reducer
