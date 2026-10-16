import { createSelector } from '@reduxjs/toolkit'

export const selectProducts = (state) => state.cart.products
export const selectCartItems = (state) => state.cart.items

export const selectProductsWithCartQuantity = createSelector(
  [selectProducts, selectCartItems],
  (products, cartItems) => products.map((product) => ({
    ...product,
    quantityInCart: cartItems.find((item) => item.productId === product.id)?.quantity ?? 0,
  })),
)

export const calculateTotalPrice = createSelector(
  [selectProducts, selectCartItems],
  (products, cartItems) => cartItems.reduce((total, item) => {
    const product = products.find((availableProduct) => availableProduct.id === item.productId)
    return total + (product ? product.price * item.quantity : 0)
  }, 0),
)
