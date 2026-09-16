"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Library {
    constructor() {
        this.books = [];
    }
    addBook(book) {
        this.books.push(book);
    }
    getBookDetails(isbn) {
        return this.books.find((book) => book.isbn === isbn);
    }
    getBooks() {
        return [...this.books];
    }
}
class DigitalLibrary extends Library {
    constructor(website) {
        super();
        this.website = website;
    }
    listBooks() {
        return this.getBooks().map((book) => book.title);
    }
}
const digitalLibrary = new DigitalLibrary("https://example-library.com");
digitalLibrary.addBook({
    title: "The Hobbit",
    author: "J. R. R. Tolkien",
    isbn: "978-0547928227",
    publishedYear: 1937,
    genre: "Fantasy",
});
digitalLibrary.addBook({
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "978-0141439518",
    publishedYear: 1813,
    genre: "Romance",
});
console.log(digitalLibrary.getBookDetails("978-0547928227"));
console.log(digitalLibrary.getBookDetails("978-0141439518"));
console.log(digitalLibrary.listBooks());
