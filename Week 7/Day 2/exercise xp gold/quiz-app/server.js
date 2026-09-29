const express = require('express');
const path = require('path');
require('dotenv').config();

const quizRoutes = require('./server/routes/quizRoutes');
const userRoutes = require('./server/routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/quiz', quizRoutes);
app.use('/api/users', userRoutes);

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

app.listen(PORT, () => console.log(`Quiz Server listening on http://localhost:${PORT}`));