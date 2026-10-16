import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  categories: [
    { id: 'work', name: 'Work', color: 'blue' },
    { id: 'personal', name: 'Personal', color: 'peach' },
    { id: 'wellbeing', name: 'Wellbeing', color: 'sage' },
  ],
  tasks: [
    { id: 'task-1', title: 'Prepare the weekly project notes', categoryId: 'work', completed: false },
    { id: 'task-2', title: 'Reply to the design team', categoryId: 'work', completed: true },
    { id: 'task-3', title: 'Pick up fresh flowers', categoryId: 'personal', completed: false },
    { id: 'task-4', title: 'Take a proper lunch break', categoryId: 'wellbeing', completed: true },
    { id: 'task-5', title: 'Plan tomorrow before signing off', categoryId: null, completed: false },
  ],
}

const productivitySlice = createSlice({
  name: 'productivity',
  initialState,
  reducers: {
    addTask: {
      reducer: (state, action) => {
        state.tasks.push(action.payload)
      },
      prepare: ({ title, categoryId }) => ({
        payload: { id: nanoid(), title, categoryId: categoryId || null, completed: false },
      }),
    },
    editTask: (state, action) => {
      const task = state.tasks.find((item) => item.id === action.payload.id)

      if (task) {
        if (typeof action.payload.title === 'string') {
          task.title = action.payload.title
        }

        if ('categoryId' in action.payload) {
          task.categoryId = action.payload.categoryId || null
        }
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
    },
    updateTaskProgress: (state, action) => {
      const task = state.tasks.find((item) => item.id === action.payload)

      if (task) {
        task.completed = !task.completed
      }
    },
    addCategory: {
      reducer: (state, action) => {
        state.categories.push(action.payload)
      },
      prepare: (name) => ({
        payload: { id: nanoid(), name, color: 'violet' },
      }),
    },
    editCategory: (state, action) => {
      const category = state.categories.find((item) => item.id === action.payload.id)

      if (category) {
        category.name = action.payload.name
      }
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter((category) => category.id !== action.payload)
      state.tasks.forEach((task) => {
        if (task.categoryId === action.payload) {
          task.categoryId = null
        }
      })
    },
  },
})

export const {
  addTask,
  editTask,
  deleteTask,
  updateTaskProgress,
  addCategory,
  editCategory,
  deleteCategory,
} = productivitySlice.actions

export default productivitySlice.reducer
