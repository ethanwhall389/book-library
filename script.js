let myLibrary = [];

const DisplayController = (() => {
    //Modal pop-up
    let mainContainer = document.querySelector('.main-content');
    let showModalBttn = document.querySelector('.open-modal-bttn');
    let closeModalBttn = document.querySelector('.close');
    let modal = document.querySelector('.modal-container')

    showModalBttn.addEventListener('click', openModal);
    closeModalBttn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            closeModal()
        }
    });

    function openModal () {
        modal.style.display = 'flex';
    }

    function closeModal () {
        modal.style.display = 'none';
    }
    })();


// Book Constructor
class Book {
    constructor (title, author, pages, hasRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        hasRead == true ? this.hasRead = 'Read' : this.hasRead = 'Not Read';
    }

    toggleRead () {
        this.hasRead == 'Read' ? this.hasRead = 'Not Read' : this.hasRead = 'Read';
        clearDisplay();
        updateDisplay();
    }

    addBookToLibrary (book) {
        clearDisplay();
        myLibrary.push(book);
        updateDisplay();
    }
}

const Functionality = (() => {

})();


// BEGIN NEW CODE

//Modal pop-up
let showModalBttn = document.querySelector('.open-modal-bttn');
let closeModalBttn = document.querySelector('.close');
let modal = document.querySelector('.modal-container')

showModalBttn.addEventListener('click', openModal);
closeModalBttn.addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        closeModal()
    }
});

function openModal () {
    modal.style.display = 'flex';
}

function closeModal () {
    modal.style.display = 'none';
}



// Book Constructor
class Book {
    constructor (title, author, pages, hasRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        hasRead == true ? this.hasRead = 'Read' : this.hasRead = 'Not Read';
    }

    toggleRead () {
        this.hasRead == 'Read' ? this.hasRead = 'Not Read' : this.hasRead = 'Read';
        clearDisplay();
        updateDisplay();
    }
}
// function Book (title, author, pages, hasRead) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     if (hasRead == true) {
//         this.hasRead = 'Read'
//     } else {
//         this.hasRead = 'Not Read'
//     }
// }

// Book.prototype.toggleRead = function () {
//     if (this.hasRead == 'Read') {
//         this.hasRead = 'Not Read';
//     } else {
//         this.hasRead = 'Read';
//     }
//     clearDisplay();
//     updateDisplay();
// }

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

    //Update the display as soon as the window loads-- show stored books or show no books.
window.addEventListener('load', updateDisplay);

function updateDisplay () {
    let noBooksMessage = document.querySelector('.no-books-container');
    if (myLibrary.length == 0) {
        mainContainer.style.display = 'none';
        noBooksMessage.style.display = 'flex';
    } else {
        noBooksMessage.style.display = 'none';
        mainContainer.style.display = 'grid';
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
            let removeBttn = document.createElement('button');
            removeBttn.textContent = 'Remove Book';
            removeBttn.setAttribute('data', i);
            removeBttn.addEventListener('click', removeBook);
            let toggleReadBttn = document.createElement('button');
            toggleReadBttn.textContent = 'Change read status';
            toggleReadBttn.addEventListener('click', () => myLibrary[i].toggleRead());

            let detailsDiv = document.createElement('div');
            detailsDiv.classList.add('details-div');

            
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
            detailsDiv.appendChild(toggleReadBttn);
            detailsDiv.appendChild(removeBttn);
        }
    }
}


let form = document.forms['add-book']
form.addEventListener('submit', submitForm);
function submitForm (event) {
    event.preventDefault();
    let book = new Book (this.title.value, this.author.value, this.pages.value, this.hasRead.checked);
    closeModal();
    addBookToLibrary(book);
}


function removeBook () {
    let indexToRemove = this.getAttribute('data');
    myLibrary.splice(indexToRemove, 1);
    clearDisplay();
    updateDisplay();
}
