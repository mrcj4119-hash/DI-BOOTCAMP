const booksModel = require('../models/booksModel');

// GET /api/books (Read all)
const getBooks = async (req, res, next) => {
  try {
    const books = await booksModel.getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

// GET /api/books/:bookId (Read single book)
const getBook = async (req, res, next) => {
  const { bookId } = req.params;
  try {
    const book = await booksModel.getBookById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

// POST /api/books (Create new book)
const createBook = async (req, res, next) => {
  const { title, author, publishedYear } = req.body;

  if (!title || !author || !publishedYear) {
    return res.status(400).json({ message: 'Title, author, and publishedYear are required' });
  }

  try {
    const [newBook] = await booksModel.createBook(title, author, publishedYear);
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBooks,
  getBook,
  createBook,
}; 