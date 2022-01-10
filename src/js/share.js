import { copyToClipboard } from './utils';
import { showToast } from './toast';

const shareUrlButton = document.querySelector('.share-btn.copy-link');

function handleCopyUrl() {
  copyToClipboard(window.location);
  showToast({ content: 'URL copied to clipboard!' });
}

shareUrlButton.addEventListener('click', handleCopyUrl);
