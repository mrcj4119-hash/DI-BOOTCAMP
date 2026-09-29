const express = require('express');
require('dotenv').config();

const booksRoutes = require('./server/routes/booksRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Body parsing middleware
app.use(express.json());

// Mount routes at /api/books
app.use('/api/books', booksRoutes);

// Error Handling: Invalid Routes (404)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler (500)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Listen on port 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});