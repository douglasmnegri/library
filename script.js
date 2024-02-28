const myLibrary = [
  {
    title: "Lord of the Rings",
    author: "J. R. R. Tolkien",
    pages: 432,
    genre: "Adventure",
    read: true,
    printId: false,
  },
  {
    title: "Harry Potter",
    author: "J.K. Rowling",
    pages: 320,
    genre: "Fantasy",
    read: true,
    printId: false,
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    pages: 281,
    genre: "Fiction",
    read: true,
    printId: false,
  },
  {
    title: "1984",
    author: "George Orwell",
    pages: 328,
    genre: "Dystopian",
    read: false,
    printId: false,
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    pages: 180,
    genre: "Fiction",
    read: true,
    printId: false,
  },
];
// { title: "Nineteen Eigthy-four", pages: 335, read: false }

function Book(title, author, pages, genre, read, printId) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.genre = genre;
  this.read = read;
  this.printId = printId;
}

Book.prototype.addBookToLibrary = addBookToLibrary;
Book.prototype.listOfBooks = listOfBooks;

let title = document.getElementById("book-title");
let author = document.getElementById("book-author");
let pages = document.getElementById("book-pages");
let genre = document.getElementById("book-genre");
let read = document.getElementById("status-read");

function listOfBooks() {
  const button = document.getElementById("btn");
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const bookToAdd = new Book(
      title.value,
      author.value,
      pages.value,
      genre.value,
      read.checked
    );
    bookToAdd.addBookToLibrary();
    clearFieldContent();
    printBooks(myLibrary);
  });
}

listOfBooks();

function addBookToLibrary() {
  myLibrary.push(this);
}

const searchInput = document.getElementById("search-item");
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.trim().toUpperCase(); // Trim whitespace and convert to uppercase
  const searchMatch = myLibrary.filter((element) => {
    return (
      element.title.toUpperCase().includes(searchTerm) ||
      element.author.toUpperCase().includes(searchTerm)
    );
  });
  clearBookContainer();
  printBooks(searchMatch);
});

function clearBookContainer() {
  const bookContainer = document.querySelector(".list-of-books");
  bookContainer.innerHTML = "";
}

function printBooks(books) {
  const bookContainer = document.querySelector(".list-of-books");
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    // Check if the book already exists in the DOM
    if (!document.getElementById(book.title)) {
      const bookExample = document.createElement("li");
      bookExample.id = book.title; // Set the ID of the book element

      const title = document.createElement("div");
      const author = document.createElement("div");
      const pages = document.createElement("div");
      const genre = document.createElement("div");
      const readBox = document.createElement("div");
      const removeBox = document.createElement("div");
      const read = document.createElement("button");
      const remove = document.createElement("button");

      title.textContent = `Title: ${book.title}`;
      author.textContent = `Author: ${book.author}`;
      pages.textContent = `Pages: ${book.pages}`;
      genre.textContent = `Genre: ${book.genre}`;
      remove.textContent = "Remove";
      book.read === true
        ? (read.textContent = "Read")
        : ((read.textContent = "Not read"),
          (read.style.backgroundColor = "#e76b2d"));

      read.addEventListener("click", () => {
        if (read.textContent === "Read") {
          read.textContent = "Not read";
          read.style.backgroundColor = "#e76b2d";
        } else {
          read.textContent = "Read";
          read.style.backgroundColor = "#333d30";
        }
      });

      remove.addEventListener("click", () => {
        // Remove the book from the library array
        const indexToRemove = myLibrary.findIndex(
          (item) => item.title === book.title
        );
        if (indexToRemove !== -1) {
          myLibrary.splice(indexToRemove, 1);
        }
        // Remove the book element from the DOM
        bookExample.remove();
      });

      bookExample.appendChild(title);
      title.appendChild(author);
      author.appendChild(pages);
      pages.appendChild(genre);
      genre.appendChild(readBox);
      readBox.appendChild(read);
      removeBox.appendChild(remove);
      readBox.appendChild(removeBox);
      bookContainer.appendChild(bookExample);
    }
  }
}

function clearFieldContent() {
  title.value = "";
  author.value = "";
  pages.value = "";
  genre.value = "";
  read.checked = false;
}
// Function to print all books initially
function printAllBooks() {
  printBooks(myLibrary);
}
printAllBooks();
