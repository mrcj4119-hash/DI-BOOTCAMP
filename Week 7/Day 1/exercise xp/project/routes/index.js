// routes/index.js
const express = require('express');
const router = express.Router();

// Define homepage route
router.get('/', (req, res) => {
  res.send('Welcome to the Homepage!');
});

// Define about route
router.get('/about', (req, res) => {
  res.send('About Us: This is a simple Express.js app using express.Router.');
});

module.exports = router;