# Daylist — Redux Toolkit Todo List with Thunks

A Week 9 Day 4 XP Gold exercise built with React, React Redux, and Redux Toolkit.

## Run the app

```sh
npm install
npm run dev
```

## Features

- Fetches six starter todos from JSONPlaceholder with a Redux Toolkit async thunk.
- Adds new local todos, toggles completion, and removes todos.
- Shows loading, request error, and empty-list states with a retry action.
- Uses `configureStore`, which includes Redux Thunk middleware by default.

## Redux flow

- `src/app/store.js` configures the Redux store.
- `src/features/todos/todosSlice.js` defines todo actions and the asynchronous `fetchTodos` thunk.
- `src/components/TodoList.jsx` loads and selects todos from the store.
- `src/components/AddTodo.jsx`, `ToggleTodo.jsx`, and `RemoveTodo.jsx` dispatch todo actions.
