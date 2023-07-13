// Book Constructor
function Book (title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

let mainContainer = document.querySelector('.main-content');
let myLibrary = [];

function addBookToLibrary (book) {
    clearDisplay();
    myLibrary.push(book);
    updateDisplay();
}


function clearDisplay () {
    while (mainContainer.firstChild) {
        mainContainer.removeChild(mainContainer.lastChild);
    }
}

function updateDisplay () {
    for (let i = 0; i < myLibrary.length; i++) {
        let cardDiv = document.createElement('div');
        cardDiv.classList.add('book-card')
        let bookTitle = document.createElement('p');
        bookTitle.classList.add('book-title');
        let bookAuthor = document.createElement('p');
        bookAuthor.classList.add('book-author', 'book-content');
        let bookPages = document.createElement('p');
        bookPages.classList.add('book-pages', 'book-content');
        let bookHasRead = document.createElement('p');
        bookHasRead.classList.add('book-has-read', 'book-content');
        
        let detailsDiv = document.createElement('div');

        
        mainContainer.appendChild(cardDiv);

        bookTitle.textContent = myLibrary[i].title;
        bookAuthor.textContent = myLibrary[i].author;
        bookPages.textContent = myLibrary[i].pages;
        bookHasRead.textContent = myLibrary[i].hasRead;
        cardDiv.appendChild(bookTitle);
        cardDiv.appendChild(detailsDiv);
        detailsDiv.appendChild(bookAuthor);
        detailsDiv.appendChild(bookPages);
        detailsDiv.appendChild(bookHasRead);
    }
}


let form = document.forms['add-book']
form.addEventListener('submit', submitForm);
function submitForm (event) {
    event.preventDefault();
    let book = new Book (this.title.value, this.author.value, this.pages.value, this.hasRead.value);
    addBookToLibrary(book);
}