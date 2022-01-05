const modalElement = document.querySelector('.modal');
const closeModalBtn = modalElement.querySelector('.close');

export function toggleModal() {
  const isHidden = modalElement.getAttribute('aria-hidden');
  modalElement.setAttribute('aria-hidden', `${isHidden === 'true' ? 'false' : 'true'}`);
}

closeModalBtn.addEventListener('click', toggleModal);
