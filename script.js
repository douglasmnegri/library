const myLibrary = [
  {
    title: "Lord of the Rings",
    author: "J. R. R. Tolkien",
    pages: 432,
    genre: "Adventure",
    read: true,
  },
  {
    title: "Harry Potter",
    author: "J.K. Rowling",
    pages: 320,
    genre: "Fantasy",
    read: true,
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    pages: 281,
    genre: "Fiction",
    read: true,
  },
  {
    title: "1984",
    author: "George Orwell",
    pages: 328,
    genre: "Dystopian",
    read: false,
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    pages: 180,
    genre: "Fiction",
    read: true,
  },
];
// { title: "Nineteen Eigthy-four", pages: 335, read: false }

function Book(title, author, pages, genre, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.genre = genre;
  this.read = read;
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
    printBook();
    clearFieldContent();
  });
}

listOfBooks();

function addBookToLibrary() {
  myLibrary.push(this);
}

function printBook() {
  const bookContainer = document.querySelector(".list-of-books");
  for (let i = 0; i < myLibrary.length; i++) {
    const bookExample = document.createElement("li");
    const title = document.createElement("div");
    const author = document.createElement("div");
    const pages = document.createElement("div");
    const genre = document.createElement("div");
    const readBox = document.createElement("div");
    const removeBox = document.createElement("div");
    const read = document.createElement("button");
    const remove = document.createElement("button");

    title.textContent = `Title: ${myLibrary[i].title}`;
    author.textContent = `Author: ${myLibrary[i].author}`;
    pages.textContent = `Pages: ${myLibrary[i].pages}`;
    genre.textContent = `Genre: ${myLibrary[i].genre}`;
    remove.textContent = "Remove";
    myLibrary[i].read === true
      ? (read.textContent = "Read")
      : (read.textContent = "Not read");

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

function clearFieldContent() {
  title.value = "";
  author.value = "";
  pages.value = "";
  genre.value = "";
  read.checked = false;
}

printBook();
