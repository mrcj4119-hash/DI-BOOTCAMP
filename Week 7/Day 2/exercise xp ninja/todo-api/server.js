const express = require('express');
require('dotenv').config();

const todosRoutes = require('./server/routes/todosRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Body parser
app.use(express.json());

// API Routes
app.use('/api/todos', todosRoutes);

// Error Handling: Invalid Routes (404)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler (500)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});