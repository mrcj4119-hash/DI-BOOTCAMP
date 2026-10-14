import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [
    { id: 'p-001', name: 'Everyday notebook', category: 'Stationery', price: 8.5, quantity: 24 },
    { id: 'p-002', name: 'Ceramic mug', category: 'Home goods', price: 18, quantity: 12 },
    { id: 'p-003', name: 'Canvas tote', category: 'Accessories', price: 22, quantity: 4 },
    { id: 'p-004', name: 'Desk planter', category: 'Home goods', price: 15.75, quantity: 0 },
  ],
}

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload)
    },
    updateQuantity: (state, action) => {
      const product = state.products.find((item) => item.id === action.payload.id)

      if (product) {
        product.quantity = action.payload.quantity
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload)
    },
  },
})

export const { addProduct, updateQuantity, removeProduct } = inventorySlice.actions
export default inventorySlice.reducer
