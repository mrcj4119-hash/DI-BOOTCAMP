# Team Pulse — Redux Toolkit user dashboard

A Week 9 Day 4 XP Ninja exercise built with React, React Redux, and Redux Toolkit.

## Run the app

```sh
npm install
npm run dev
```

## Features

- Loads a list of users from JSONPlaceholder.
- Lets the user select a profile and fetch the matching profile and tasks with async thunks.
- Shows loading, error, and empty states while the data is syncing.
- Allows adding, toggling, and removing todos for the selected user.
- Keeps the state in a single Redux Toolkit slice and updates the UI in real time.

## Redux flow

- `src/app/store.js` creates the Redux store with Thunk middleware enabled by default.
- `src/features/users/usersSlice.js` defines async thunk actions for fetching users and tasks.
- `src/components/UserDirectory.jsx` connects the search form, user cards, and task list to Redux state.
- `src/main.jsx` wires the store into the React app.
