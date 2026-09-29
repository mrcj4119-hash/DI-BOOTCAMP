const express = require('express');
require('dotenv').config();

const postsRoutes = require('./server/routes/postsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser
app.use(express.json());

// Routes
app.use('/posts', postsRoutes);

// Error Handling: Invalid Routes (404)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handling: Server Errors (500)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});