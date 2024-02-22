const myLibrary = [];

function Book() {
  // the constructor...
}

const bookTitle = document.querySelector("#book-title");
const bookPages = document.querySelector("#book-pages");
const button = document.querySelector("#btn");

function addBookToLibrary() {
  // do stuff here
}
button.addEventListener("click", () => {
  console.log(bookTitle.value, bookPages.value);
});