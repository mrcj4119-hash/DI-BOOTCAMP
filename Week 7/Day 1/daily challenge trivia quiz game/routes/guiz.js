const express = require('express');
const router = express.Router();

// Hard-coded trivia questions
const triviaQuestions = [
  {
    question: "What is the capital of France?",
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    answer: "Mars",
  },
  {
    question: "What is the largest mammal in the world?",
    answer: "Blue whale",
  },
];

// In-memory game state
let currentQuestionIndex = 0;
let score = 0;
let lastFeedback = null; // Stores feedback for the previously answered question

// Helper CSS styles for UI
const baseStyles = `
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f0f2f5;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
    }
    .card {
      background: white;
      padding: 2.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 500px;
      box-sizing: border-box;
    }
    h1 { color: #333; margin-top: 0; font-size: 1.8rem; text-align: center; }
    .progress { color: #666; font-size: 0.9rem; margin-bottom: 1.5rem; font-weight: 600; }
    .question { font-size: 1.2rem; font-weight: 600; color: #2c3e50; margin-bottom: 1.5rem; }
    .form-group { margin-bottom: 1.5rem; }
    input[type="text"] {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #ddd;
      border-radius: 6px;
      font-size: 1rem;
      box-sizing: border-box;
      transition: border-color 0.2s;
    }
    input[type="text"]:focus { border-color: #3498db; outline: none; }
    button, .btn {
      display: block;
      width: 100%;
      padding: 0.75rem;
      background-color: #3498db;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: bold;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      box-sizing: border-box;
    }
    button:hover, .btn:hover { background-color: #2980b9; }
    .feedback {
      padding: 0.75rem;
      border-radius: 6px;
      margin-bottom: 1.5rem;
      font-weight: 600;
    }
    .feedback.correct { background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
    .feedback.incorrect { background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
    .score-display { font-size: 2.5rem; text-align: center; color: #2c3e50; margin: 1.5rem 0; font-weight: bold; }
  </style>
`;

// Helper: Reset game state
function resetGame() {
  currentQuestionIndex = 0;
  score = 0;
  lastFeedback = null;
}

// 1. GET /quiz - Start quiz / Display current question
router.get('/', (req, res) => {
  // If quiz is finished, redirect to score page
  if (currentQuestionIndex >= triviaQuestions.length) {
    return res.redirect('/quiz/score');
  }

  const q = triviaQuestions[currentQuestionIndex];

  let feedbackHtml = '';
  if (lastFeedback) {
    feedbackHtml = `
      <div class="feedback ${lastFeedback.isCorrect ? 'correct' : 'incorrect'}">
        ${lastFeedback.message}
      </div>
    `;
    lastFeedback = null; // Clear feedback after rendering once
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Trivia Quiz</title>
      ${baseStyles}
    </head>
    <body>
      <div class="card">
        <h1>Trivia Quiz</h1>
        <div class="progress">Question ${currentQuestionIndex + 1} of ${triviaQuestions.length}</div>
        
        ${feedbackHtml}

        <div class="question">${q.question}</div>
        
        <form action="/quiz" method="POST">
          <div class="form-group">
            <input type="text" name="answer" placeholder="Type your answer here..." required autocomplete="off">
          </div>
          <button type="submit">Submit Answer</button>
        </form>
      </div>
    </body>
    </html>
  `);
});

// 2. POST /quiz - Process submitted answer and move to next question
router.post('/', (req, res) => {
  // If quiz is already completed, redirect to score page
  if (currentQuestionIndex >= triviaQuestions.length) {
    return res.redirect('/quiz/score');
  }

  const userAnswer = req.body.answer ? req.body.answer.trim() : '';
  const currentQuestion = triviaQuestions[currentQuestionIndex];

  // Case-insensitive comparison
  const isCorrect = userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase();

  if (isCorrect) {
    score++;
    lastFeedback = { isCorrect: true, message: "✅ Correct!" };
  } else {
    lastFeedback = { 
      isCorrect: false, 
      message: `❌ Incorrect! The correct answer was: <strong>${currentQuestion.answer}</strong>` 
    };
  }

  // Advance to next question
  currentQuestionIndex++;

  // Redirect back to GET /quiz to show next question or final score
  res.redirect('/quiz');
});

// 3. GET /quiz/score - Display final score at the end of the quiz
router.get('/score', (req, res) => {
  const totalQuestions = triviaQuestions.length;
  const finalScore = score;

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Quiz Results</title>
      ${baseStyles}
    </head>
    <body>
      <div class="card">
        <h1>Quiz Completed! 🎉</h1>
        <p style="text-align: center; color: #666;">Here is how you performed:</p>
        
        <div class="score-display">
          ${finalScore} / ${totalQuestions}
        </div>

        <a href="/quiz/reset" class="btn">Play Again</a>
      </div>
    </body>
    </html>
  `);
});

// Reset route to restart the game
router.get('/reset', (req, res) => {
  resetGame();
  res.redirect('/quiz');
});

module.exports = router;