const express = require('express');
const quizRouter = require('./routes/quiz');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse URL-encoded form submissions
app.use(express.urlencoded({ extended: true }));

// Mount quiz router under /quiz
app.use('/quiz', quizRouter);

// Root path redirects directly to the quiz
app.get('/', (req, res) => {
  res.redirect('/quiz');
});

// Global error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Trivia Quiz app running at http://localhost:${PORT}`);
});