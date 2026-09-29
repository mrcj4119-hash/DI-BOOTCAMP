const express = require('express');
const router = express.Router();

// List of available emojis
const emojis = ["😀", "🎉", "🌟", "🎈", "👋"];

// Shared CSS styles for clean UI presentation
const baseStyles = `
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f4f7f6;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
    }
    .card {
      background: white;
      padding: 2rem 2.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 420px;
      box-sizing: border-box;
    }
    h1 { color: #333; margin-top: 0; font-size: 1.6rem; text-align: center; }
    .form-group { margin-bottom: 1.25rem; }
    label { display: block; margin-bottom: 0.5rem; color: #555; font-weight: 600; }
    input[type="text"], select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 1rem;
      box-sizing: border-box;
    }
    button {
      width: 100%;
      padding: 0.75rem;
      background-color: #4A90E2;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    button:hover { background-color: #357ABD; }
    .error { color: #d9534f; font-weight: 500; margin-bottom: 1rem; text-align: center; }
    .greeting { font-size: 2rem; text-align: center; margin-bottom: 1.5rem; }
    .btn-back { display: block; text-align: center; color: #4A90E2; text-decoration: none; font-weight: 600; }
  </style>
`;

// Helper function to render the form HTML
function renderForm(errorMessage = '', previousName = '', selectedEmoji = '') {
  const emojiOptions = emojis
    .map((e) => `<option value="${e}" ${e === selectedEmoji ? 'selected' : ''}>${e}</option>`)
    .join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Emoji Greeting App</title>
      ${baseStyles}
    </head>
    <body>
      <div class="card">
        <h1>Emoji Greeting App</h1>
        ${errorMessage ? `<p class="error">${errorMessage}</p>` : ''}
        <form action="/greet" method="POST">
          <div class="form-group">
            <label for="name">Your Name:</label>
            <input type="text" id="name" name="name" value="${previousName}" placeholder="Enter your name">
          </div>
          <div class="form-group">
            <label for="emoji">Choose an Emoji:</label>
            <select id="emoji" name="emoji">
              ${emojiOptions}
            </select>
          </div>
          <button type="submit">Send Greeting</button>
        </form>
      </div>
    </body>
    </html>
  `;
}

// 1. GET / - Display form
router.get('/', (req, res) => {
  res.send(renderForm());
});

// 2. POST /greet - Process submission & display greeting
router.post('/greet', (req, res) => {
  const { name, emoji } = req.body;

  // Validation: Check if name exists and isn't just whitespace
  if (!name || name.trim() === '') {
    return res.status(400).send(renderForm('Please enter your name!', '', emoji));
  }

  // Ensure selected emoji is valid
  const validEmoji = emojis.includes(emoji) ? emoji : emojis[0];
  const sanitizedName = name.trim();

  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Greeting</title>
      ${baseStyles}
    </head>
    <body>
      <div class="card">
        <h1>Welcome!</h1>
        <div class="greeting">
          ${validEmoji} Hello, <strong>${sanitizedName}</strong>! ${validEmoji}
        </div>
        <a href="/" class="btn-back">← Send another greeting</a>
      </div>
    </body>
    </html>
  `);
});

module.exports = router;