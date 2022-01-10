const toastTemplate = document.querySelector('#toast-template');
const toastContainer = document.querySelector('.toast-container');

const DEFAULT_DELAY_TIME = 8000;

function createToast({ content, delay }) {
  const toastElement = toastTemplate.content.querySelector('.toast');
  const toastBody = toastElement.querySelector('.toast__body');
  const id = Date.now();

  toastElement.setAttribute('data-id', id);
  toastElement.setAttribute('data-delay', delay);
  toastBody.innerHTML = content;

  const toastNode = document.importNode(toastTemplate.content, true);
  toastContainer.appendChild(toastNode);

  return toastContainer.querySelector(`.toast[data-id='${id}']`);
}

function removeAnimation() {
  if (this.classList.contains('slide-in')) {
    this.classList.remove('slide-in');
  } else if (this.classList.contains('slide-out')) {
    this.classList.remove('slide-out', 'show');
    this.remove();
  }
}

function closeToast({ target }) {
  target.classList.add('slide-out');
}

function handleCloseToast(e) {
  e.preventDefault();
  const toast = e.currentTarget.closest('.toast');
  closeToast({ target: toast });
}

export function showToast({ content, autoClose = true, delay = DEFAULT_DELAY_TIME }) {
  const toastElement = createToast({ content, delay });

  toastElement.addEventListener('animationend', removeAnimation);
  toastElement.querySelector('.close').addEventListener('click', handleCloseToast);
  toastElement.classList.add('show', 'slide-in');

  if (autoClose) {
    const timeToClose = +toastElement.getAttribute('data-delay');
    setTimeout(() => {
      closeToast({ target: toastElement });
    }, timeToClose);
  }
}
