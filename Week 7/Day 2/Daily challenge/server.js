const express = require('express');
require('dotenv').config();

const userRoutes = require('./server/routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Body Parser Middleware
app.use(express.json());

// Routes Middleware
app.use('/', userRoutes);

// 404 Route Not Found
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start Server
app.listen(PORT, () => {
  console.log(`User Management Server running on http://localhost:${PORT}`);
});