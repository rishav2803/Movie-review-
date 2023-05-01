const modal = document.querySelector('.modal');

const modalButton = document.querySelector('.modal-button');

const closeBtn = document.querySelector('.closeButton');
// console.log(modalButton);

modalButton.addEventListener('click', () => {
  modal.classList.add('active');
})

closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
})
