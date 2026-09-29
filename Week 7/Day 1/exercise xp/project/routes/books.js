// routes/books.js
const express = require('express');
const router = express.Router();

// Sample in-memory database for storing books
let books = [
  { id: 1, title: ' The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];

// GET: Get all books
router.get('/', (req, res) => {
  res.json(books);
});

// POST: Add a new book
router.post('/', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }

  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT: Update a book by ID
router.put('/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  if (title) book.title = title;
  if (author) book.author = author;

  res.json({ message: 'Book updated successfully', book });
});

// DELETE: Delete a book by ID
router.delete('/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex((b) => b.id === bookId);

  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const deletedBook = books.splice(index, 1);
  res.json({ message: 'Book deleted successfully', book: deletedBook[0] });
});

module.exports = router;