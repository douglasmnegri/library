const myLibrary = [];
// { title: "Nineteen Eigthy-four", pages: 335, read: false }


function Book(title, pages, read) {
  this.title = title;
  this.pages = pages;
  this.read = read;
}

Book.prototype.addBookToLibrary = addBookToLibrary;
Book.prototype.listOfBooks = listOfBooks;

function listOfBooks() {
  const button = document.getElementById("btn");

  button.addEventListener("click", (e) => {
    e.preventDefault();
    title = document.getElementById("book-title").value;
    pages = document.getElementById("book-pages").value;
    read = document.getElementById("status-read").checked;
    const bookToAdd = new Book(title, pages, read);
    bookToAdd.addBookToLibrary();
    printBook();
  });
}

function addBookToLibrary() {
  myLibrary.push(this);
}

listOfBooks()

function printBook() {
  const bookContainer = document.querySelector(".list-of-books");
  for (let i = 0; i < myLibrary.length; i++) {
    const bookExample = document.createElement("li");
    const title = document.createElement("div");
    const pages = document.createElement("div");
    const read = document.createElement("div");

    title.textContent = `Title: ${myLibrary[i].title}`;
    pages.textContent = `Pages: ${myLibrary[i].pages}`;
    read.textContent = `Read: ${myLibrary[i].read}`;

    bookExample.appendChild(title);
    title.appendChild(pages);
    pages.appendChild(read);
    bookContainer.appendChild(bookExample);
  }
}