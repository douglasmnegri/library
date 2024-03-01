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
    read: false,
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
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    pages: 279,
    genre: "Romance",
    read: true,
    printId: false,
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    pages: 224,
    genre: "Coming-of-age",
    read: false,
    printId: false,
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 310,
    genre: "Fantasy",
    read: true,
    printId: false,
  },
];

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

      function readBtn(book) {
        read.addEventListener("click", () => {
          if (book.read === false) {
            read.textContent = "Read";
            read.style.backgroundColor = "#333d30";
            book.read = true;
          } else if (book.read === true) {
            read.textContent = "Not read";
            read.style.backgroundColor = "#e76b2d";
            book.read = false;
          }
        });
      }

      readBtn(book);

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
// Function to print all books initially
function printAllBooks() {
  printBooks(myLibrary);
}
printAllBooks();

// Field control for validation and design
const btn = document.getElementById("btn");
const bookT = document.getElementById("book-title");
const bookA = document.getElementById("book-author");
const bookP = document.getElementById("book-pages");

function validationState() {
  function validateInputs() {
    const titleFilled = bookT.value.trim().length > 0;
    const authorFilled = bookA.value.trim().length > 0;
    return titleFilled && authorFilled;
  }

  function updateButtonState() {
    btn.disabled = !validateInputs();
  }

  // Allow only numbers and backspace/delete keys
  function numberOnly(event) {
    const keyCode = event.keyCode;
    if ((keyCode < 48 || keyCode > 57) && keyCode !== 8 && keyCode !== 46) {
      event.preventDefault();
    }
  }

  bookT.addEventListener("input", updateButtonState);
  bookA.addEventListener("input", updateButtonState);
  bookP.addEventListener("keydown", numberOnly);

  updateButtonState();
}

validationState();

function clearFieldContent() {
  title.value = "";
  author.value = "";
  pages.value = "";
  genre.value = "";
  read.checked = false;
  btn.disabled = true;
}

// Filters
const searchInput = document.getElementById("search-item");
const bookFilter = document.getElementById("book-filter");

function applyFilters() {
  const searchTerm = searchInput.value.trim().toUpperCase();
  const bookState = bookFilter.value;
  let filteredBooks = myLibrary;

  if (searchTerm !== "") {
    filteredBooks = filteredBooks.filter((element) => {
      return (
        element.title.toUpperCase().includes(searchTerm) ||
        element.author.toUpperCase().includes(searchTerm)
      );
    });
  }

  if (bookState === "Read") {
    filteredBooks = filteredBooks.filter((element) => {
      return element.read === true;
    });
  } else if (bookState === "Not read") {
    filteredBooks = filteredBooks.filter((element) => {
      return element.read === false;
    });
  }

  clearBookContainer();
  printBooks(filteredBooks);
}

searchInput.addEventListener("input", applyFilters);
bookFilter.addEventListener("change", applyFilters);
applyFilters(); // Initial application of filters
