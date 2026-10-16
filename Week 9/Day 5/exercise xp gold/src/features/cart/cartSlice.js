import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [
    { id: 1, name: 'Everyday Ceramic Mug', description: 'Hand-thrown stoneware · 12 oz', price: 28, color: 'clay' },
    { id: 2, name: 'Linen Market Tote', description: 'Washed European linen · natural', price: 42, color: 'linen' },
    { id: 3, name: 'Desk Companion Notebook', description: 'Recycled paper · 160 pages', price: 18, color: 'sage' },
    { id: 4, name: 'Weekend Candle', description: 'Cedar, bergamot & soft amber', price: 34, color: 'amber' },
  ],
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find((cartItem) => cartItem.productId === action.payload)

      if (item) {
        item.quantity += 1
      } else {
        state.items.push({ productId: action.payload, quantity: 1 })
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.productId !== action.payload)
    },
    updateQuantity: (state, action) => {
      const item = state.items.find((cartItem) => cartItem.productId === action.payload.productId)

      if (item) {
        item.quantity = Math.max(1, action.payload.quantity)
      }
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions
export default cartSlice.reducer
