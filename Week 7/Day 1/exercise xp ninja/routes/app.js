const express = require('express');
const greetRouter = require('./routes/greet');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse URL-encoded HTML form bodies
app.use(express.urlencoded({ extended: true }));

// Mount the router at root path
app.use('/', greetRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});