# Little List

A Week 9 Day 2 exercise: a todo list built with React and Redux.

## Run the app

```sh
npm install
npm run dev
```

## Redux structure

- `src/redux/actions.js` defines the add, toggle, and remove actions.
- `src/redux/reducer.js` updates the todo state immutably.
- `src/redux/store.js` creates the Redux store.
- `src/App.jsx` connects the React UI to Redux with `connect`.

Todos are held in memory and reset when the page is reloaded.
