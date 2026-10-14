import { configureStore } from '@reduxjs/toolkit'
import inventoryReducer from '../features/inventory/inventorySlice.js'

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
  },
})
