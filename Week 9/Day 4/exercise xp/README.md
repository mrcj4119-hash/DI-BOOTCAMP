# Redux Thunk User Directory

A Week 9 Day 4 exercise demonstrating asynchronous Redux state with React, React Redux, and Redux Toolkit.

## Run the app

```sh
npm install
npm run dev
```

## Try it

- The app loads user 1 from JSONPlaceholder when it opens.
- Enter a user ID and choose **Find user** to fetch another profile.
- User IDs 1–10 return profiles; another positive ID, such as 999, demonstrates the API error state.

## Redux flow

- `src/app/store.js` creates the store with `configureStore`. Redux Toolkit includes thunk middleware by default.
- `src/features/users/usersSlice.js` defines the user state and `fetchUserById` async thunk. Its pending, fulfilled, and rejected actions update loading, profile, and error state.
- `src/components/UserData.jsx` uses `useSelector` and `useDispatch` to connect the form and profile view to Redux.
- `src/main.jsx` makes the store available to React through React Redux's `Provider`.
