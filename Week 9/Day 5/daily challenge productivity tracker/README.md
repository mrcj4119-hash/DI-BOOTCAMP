# Productivity Tracker

A Week 9 Day 5 daily challenge demonstrating task and category management with React, React Redux, and Redux Toolkit memoized selectors.

## Run the app

```sh
npm install
npm run dev
```

## Try it

- Select a workspace to view its tasks or choose **Everything**.
- Add tasks and categories, mark tasks complete, edit their titles or categories, and delete tasks or categories.
- Deleting a category keeps its tasks by moving them to **Uncategorized**.

## Redux flow

- `src/app/store.js` configures the Redux store with the productivity reducer.
- `src/features/productivity/productivitySlice.js` holds tasks and categories and defines their add, edit, delete, and progress actions.
- `src/features/productivity/productivitySelectors.js` provides memoized task-by-category and completed-task selectors and a category-by-ID selector.
- `src/components/CategorySelector.jsx` lets users view and manage categories.
- `src/components/TaskList.jsx` displays and manages tasks for the selected category.
- `src/main.jsx` provides the store to React through React Redux.
