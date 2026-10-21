# Recipe Explorer

Install dependencies and start the app with `npm install` and `npm run dev`.
Copy `.env.example` to `.env.local`, add a Spoonacular API key, and restart Vite.

Vite exposes `VITE_` variables in browser code. For production, call Spoonacular
through a server-side proxy instead of shipping a private API key to the client.
