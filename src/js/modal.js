const modalElement = document.querySelector('.modal');
const closeModalBtn = modalElement.querySelector('.close');

export function toggleModal() {
  const isHidden = modalElement.getAttribute('aria-hidden');
  if (isHidden === 'false') {
    closeModal();
  } else {
    modalElement.setAttribute('aria-hidden', `false`);
  }
}

export function closeModal() {
  modalElement.querySelector('.modal-content').classList.add('slide-out');
}

function removeSlideOutAnimation() {
  if (this.classList.contains('slide-out')) {
    this.classList.remove('slide-out');
    this.parentElement.setAttribute('aria-hidden', 'true');
  }
}

closeModalBtn.addEventListener('click', toggleModal);
modalElement.querySelector('.modal-content').addEventListener('animationend', removeSlideOutAnimation);
