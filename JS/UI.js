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


    function clearDisplay () {
        while (mainContainer.firstChild) {
            mainContainer.removeChild(mainContainer.lastChild);
        }
    }

    
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
                removeBttn.addEventListener('click', () => removeBook());
                let toggleReadBttn = document.createElement('button');
                toggleReadBttn.textContent = 'Change read status';
                toggleReadBttn.addEventListener('click', () => myLibrary[i].toggleRead());
    
                let detailsDiv = document.createElement('div');
                detailsDiv.classList.add('details-div');

                function removeBook () {
                    let indexToRemove = removeBttn.getAttribute('data');
                    myLibrary.splice(indexToRemove, 1);
                    DisplayController.clearDisplay();
                    DisplayController.updateDisplay();
                }    
                
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

    

    return {openModal, closeModal, clearDisplay, updateDisplay}
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
        DisplayController.clearDisplay();
        DisplayController.updateDisplay();
    }

    addBookToLibrary () {
        DisplayController.clearDisplay();
        myLibrary.push(this);
        DisplayController.updateDisplay();
    }

    
}


let form = document.forms['add-book']
form.addEventListener('submit', submitForm);
function submitForm (event) {
    event.preventDefault();
    let book = new Book (this.title.value, this.author.value, this.pages.value, this.hasRead.checked);
    DisplayController.closeModal();
    book.addBookToLibrary();
}


export default DisplayController;
