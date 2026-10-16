# Todo List with Filters

A Week 9 Day 5 Ninja exercise demonstrating Redux performance optimizations with React, React Redux, and memoized selectors from Redux Toolkit.

## Run the app

```sh
npm install
npm run dev
```

## Try it

- Add a task with the input at the top of the list.
- Toggle tasks complete with the checkbox and remove tasks with the delete button.
- Choose **All**, **Active**, or **Completed** to change the visible list.

## Redux flow

- `src/app/store.js` configures the Redux store. Redux Toolkit includes its recommended middleware by default.
- `src/features/todos/todosSlice.js` stores todo items and the visibility filter and defines add, toggle, remove, and filter actions.
- `src/features/todos/todosSelectors.js` exports memoized `selectTodos` and `selectFilteredTodosCount` selectors and the `selectVisibilityFilter` state selector.
- `src/components/TodoList.jsx` connects the list to Redux and uses `useCallback` for toggle, delete, and filter handlers.
- `src/main.jsx` makes the store available through React Redux's `Provider`.
