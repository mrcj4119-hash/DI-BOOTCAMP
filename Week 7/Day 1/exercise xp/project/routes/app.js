// app.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON bodies
app.use(express.json());

// Import the todos router
const todosRouter = require('./routes/todos');

// Mount the router at /todos
app.use('/todos', todosRouter);

// Start server
app.listen(PORT, () => {
  console.log(`To-Do API running on http://localhost:${PORT}`);
});