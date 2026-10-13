# Little List — Authentication

A Week 9 Day 2 exercise that combines React, Redux, and a simulated authentication flow.

## Run the app

```sh
npm install
npm run dev
```

## Features

- Register with a name, valid email address, and password of at least 8 characters.
- Sign in and sign out; a saved session is restored after reload.
- View, add, complete, remove, and filter todos after signing in.
- Each account has its own tasks, saved in browser local storage.
- Redux manages authentication and todo state; `connect` wires the UI to the store.

## Demo authentication note

This exercise simulates an auth API entirely in the browser. Account records, a generated session token, and tasks are stored in local storage; passwords are SHA-256 hashed for the demo. This is **not production authentication**: client-side storage and hashing cannot protect accounts. A real application should authenticate over HTTPS with a trusted server and use an appropriate password-hashing scheme.
