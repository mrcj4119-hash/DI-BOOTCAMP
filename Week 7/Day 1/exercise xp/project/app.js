// app.js
const express = require('express');
const app = express();
const PORT = 3000;

// Import the router module
const mainRouter = require('./routes/index');

// Middleware
app.use(express.json());

// Mount the router at the root path
app.use('/', mainRouter);

// Start the server (Step 6)
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});