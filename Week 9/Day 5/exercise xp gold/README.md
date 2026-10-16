# Shopping Cart Selector

A Week 9 Day 5 Gold exercise demonstrating Redux performance optimizations with React, React Redux, and memoized selectors from Redux Toolkit.

## Run the app

```sh
npm install
npm run dev
```

## Try it

- Choose **Add to bag** on any product to add it to your cart.
- Repeated additions increase the product quantity.
- Use the quantity controls or **Remove** to update the cart; the subtotal and bag count update with it.

## Redux flow

- `src/app/store.js` configures the Redux store. Redux Toolkit includes its recommended middleware by default.
- `src/features/cart/cartSlice.js` stores the product catalog and cart quantities and defines the cart actions.
- `src/features/cart/cartSelectors.js` exports `selectProducts`, `selectCartItems`, and the memoized `calculateTotalPrice`.
- `src/components/ShoppingCart.jsx` connects the product and cart views to Redux and uses `useCallback` for dispatch handlers.
- `src/main.jsx` makes the store available through React Redux's `Provider`.
