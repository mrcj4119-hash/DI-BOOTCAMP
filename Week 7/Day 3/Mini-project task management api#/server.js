const express = require('express');
const taskRouter = require('./taskRouter');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser middleware (Required to handle JSON payloads in POST/PUT)
app.use(express.json());

// Mount the task router at /tasks
app.use('/tasks', taskRouter);

// Handler for unhandled routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});