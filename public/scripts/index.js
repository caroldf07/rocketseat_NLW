const btnSearch = document.querySelector('#page-home main a');
const modal = document.querySelector('#modal');
const toClose = document.querySelector('#modal .header a')

console.log(btnSearch)

btnSearch.addEventListener('click', () => {modal.classList.toggle('hide')});

toClose.addEventListener('click', () => modal.classList.add('hide'))