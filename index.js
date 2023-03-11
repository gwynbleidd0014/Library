//Elements
const container = document.getElementById("book-container");
const add = document.querySelector(".add");
const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("form");
const submit = document.querySelector(".submit");
const author = document.querySelector("#author");
const title = document.querySelector("#title");
const pages = document.querySelector("#pages");
const read = document.querySelector("input[type=checkbox]");
const url = document.querySelector("#url");
//Library
let myLirary = [];

//Neccesary classes
class Book {
  constructor(author, title, pages, url, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.url = url;
    this.read = read;
  }
}

//Push books manualy to library
myLirary.push(
  new Book(
    "The Complete Malazan Book of Fallen",
    "Steven Erikson",
    11405,
    "https://m.media-amazon.com/images/I/51fEdoux39L.jpg",
    true
  )
);

myLirary.push(
  new Book(
    "Chronicles of the Black Company",
    "Glen Cook",
    704,
    "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTTKw9I-senYB642LQrBgNs4y6S_EMeaij5hS6H9G-ggVrljIBR",
    true
  )
);
myLirary.push(
  new Book(
    "The Blade Itself",
    "Joe Abercrombie",
    11405,
    "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTg1OpFJabrJwypzO8LCrxFEqMbEZUwo1rDswibTTIJnYEOV-lK",
    true
  )
);

myLirary.push(
  new Book(
    "Fire & Blood",
    "George R. R. Martin",
    736,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFkymhojwKVEzoqXm4OWzgYZtR2UdHfD--yPnUxtnx3N2SFTu2",
    true
  )
);

//Display books on load
displayBooks(myLirary);

//Event listeners
add.addEventListener("click", (e) => {
  formWrapper.classList.remove("hidden");
});

formWrapper.addEventListener("click", (e) => {
  clearForm();
  formWrapper.classList.add("hidden");
  e.stopPropagation();
});

form.addEventListener("click", (e) => {
  e.stopPropagation();
});

function clearContainer() {
  container.innerHTML = "";
}
submit.addEventListener("click", (e) => {
  e.preventDefault();
  if (!validateForm(author.value, title.value, pages.value, url.value)) return;
  addBookToLibrary(myLirary);
});

function addBookToLibrary(library) {
  myLirary.push(
    new Book(author.value, title.value, pages.value, url.value, read.checked)
  );
  clearForm();
  clearContainer();
  displayBooks(library);
  formWrapper.classList.add("hidden");
}

function displayBooks(library) {
  library.forEach((book, i) => {
    const div = document.createElement("div");
    div.classList.add("book");
    div.dataset.index = i;
    if (book.read) {
      div.classList.add("read-gradient");
    } else {
      div.classList.add("not-read-gradient");
    }
    div.innerHTML = `
      <img src="${book.url}" class ="book-cover">
      <p><span class="section-title">Author</span> - ${book.author}</p>
      <p><span class="section-title">Title</span> - ${book.title}</p>
      <p><span class="section-title">Pages</span> - ${book.pages}</p>
      <p><span class="section-title">Status</span> - <span class="status">${
        book.read ? "Finished" : "Reading"
      }</span></p>
      <div class="change-status">
        <label><span class="section-title">Change Status</span></label>
        <div class="form-item">
          <input type="checkbox" id="change-status" ${
            book.read ? "checked" : ""
          }/>
          <label for="changeStatus" class="change-status-button"></label>
        </div>
      </div>
      <img src="./assets/close.svg" class="remove-book"/>
    `;

    container.appendChild(div);
  });
  updateRemoveEventListeners();
  updateStatusEventListeners();
}

function removeBook(i, library) {
  library.splice(i, 1);
}

function updateRemoveEventListeners() {
  const removeButtons = [...document.querySelectorAll(".remove-book")];
  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const i = e.target.parentElement.dataset.index;
      console.log(`${typeof i}, LibraryBefore - ${myLirary}`);
      removeBook(Number(i), myLirary);
      clearContainer();
      displayBooks(myLirary);
      console.log(`LibraryAfter - ${myLirary}`);
    });
  });
}

function updateStatusEventListeners() {
  const changeStatus = [...document.querySelectorAll(".change-status-button")];
  changeStatus.forEach((button) => {
    button.addEventListener("click", (e) => {
      const book = e.target.parentElement.parentElement.parentElement;
      const input = book.querySelector("input");
      const statusText = book.querySelector(".status");
      if (input.checked) {
        input.checked = false;
        statusText.textContent = "Reading";
      } else {
        input.checked = true;
        statusText.textContent = "Finished";
      }

      book.classList.toggle("read-gradient");
    });
  });
}

function validateForm(author, title, pages, url) {
  const regex1 = /[0-9]+/;
  const regex2 = /^https?:/;

  if (
    author.trim().length < 3 ||
    title.trim().length < 3 ||
    !regex1.test(pages.trim()) ||
    !regex2.test(url.trim())
  ) {
    return false;
  } else {
    return true;
  }
}

function clearForm() {
  author.value = "";
  title.value = "";
  pages.value = "";
  url.value = "";
  read.checked = false;
}
