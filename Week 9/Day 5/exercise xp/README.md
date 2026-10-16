# Book Inventory Selector

A Week 9 Day 5 exercise demonstrating Redux performance optimizations with React, React Redux, and memoized selectors from Redux Toolkit.

## Run the app

```sh
npm install
npm run dev
```

## Try it

- Choose **All books**, **Horror**, **Fantasy**, or **Science fiction** to browse the inventory.
- Each genre view is derived from the same Redux book collection.

## Redux flow

- `src/app/store.js` configures the Redux store. Redux Toolkit includes its recommended middleware by default.
- `src/features/books/booksSlice.js` holds the hardcoded inventory in Redux state.
- `src/features/books/booksSelectors.js` exports `selectBooks` and memoized selectors for each genre.
- `src/components/BookList.jsx` selects and renders the requested book collection.
- `src/App.jsx` provides the genre controls and connects the interface to Redux.
- `src/main.jsx` makes the store available through React Redux's `Provider`.

The genre selectors use `createSelector`, so filtering is recomputed only when the books array changes.
