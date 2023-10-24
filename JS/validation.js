const pagesInput = document.querySelector('#pages');
const submitBttn = document.querySelector('button[type="submit"]');

submitBttn.addEventListener('click', checkInput);

function checkInput () {
    if (!pagesInput.checkValidity()) {
        pagesInput.setCustomValidity('Please provide the number of pages');
    }
}