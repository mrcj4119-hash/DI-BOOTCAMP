
const allBooks = [
    {
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        image: "https://covers.openlibrary.org/b/id/7281261-M.jpg",
        alreadyRead: true
    },
    {
        title: "The Lord of the Rings: The Fellowship of the Ring",
        author: "J.R.R. Tolkien",
        image: "https://covers.openlibrary.org/b/id/8406620-M.jpg",
        alreadyRead: false
    }
];

const listBooksSection = document.querySelector(".listBooks");

for (let book of allBooks) {

    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    
    const bookImage = document.createElement("img");
    bookImage.src = book.image;
    bookImage.alt = book.title;
    
    const bookInfo = document.createElement("div");
    bookInfo.classList.add("book-info");
    
    const bookDetails = document.createElement("p");
    bookDetails.textContent = book.title + " written by " + book.author;
    
    if (book.alreadyRead) {
        bookInfo.classList.add("read");
    }
    
    bookInfo.appendChild(bookImage);
    bookInfo.appendChild(bookDetails);
    
    bookDiv.appendChild(bookInfo);
    
    listBooksSection.appendChild(bookDiv);
}
