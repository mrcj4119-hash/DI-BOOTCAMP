# Age Tracker

Week 9 Day 4 daily challenge: a React age counter using Redux Toolkit and asynchronous thunks.

## Run

```sh
npm install
npm run dev
```

## How it works

- `ageUpAsync` and `ageDownAsync` each wait one second before resolving.
- The age slice tracks the current age and whether an update is in progress.
- While a thunk is pending, the app displays a spinner and disables both controls.
- The age cannot be decremented below zero.
- `configureStore` includes Redux Thunk middleware by default.
