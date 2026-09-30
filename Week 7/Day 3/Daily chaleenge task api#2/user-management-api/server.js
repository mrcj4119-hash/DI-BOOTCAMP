const express = require('express');
const path = require('path');
const userRouter = require('./userRouter');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static HTML files from public/
app.use(express.static(path.join(__dirname, 'public')));

// Mount routes
app.use('/', userRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Register Form: http://localhost:${PORT}/register.html`);
  console.log(`Login Form:    http://localhost:${PORT}/login.html`);
});