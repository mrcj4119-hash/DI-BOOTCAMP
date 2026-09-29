const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

// GET /api/books
router.get('/', booksController.getBooks);

// GET /api/books/:bookId
router.get('/:bookId', booksController.getBook);

// POST /api/books
router.post('/', booksController.createBook);

module.exports = router;