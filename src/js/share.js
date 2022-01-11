import { copyToClipboard, getUrlParams } from './utils';
import { showToast } from './toast';
import { downloadCode } from './download';
import { decode } from 'js-base64';
import { getState } from './state';

const shareUrlButton = document.querySelector('.share-btn.copy-link');
const downloadCodeButton = document.querySelector('.share-btn.download-code');

function handleCopyUrl() {
  copyToClipboard(window.location);
  showToast({ content: 'URL copied to clipboard!' });
}

async function handleDownloadCode() {
  const { fileName } = getState();
  const { code: hashedCodeUrl } = getUrlParams();
  const [htmlCode, jsCode, cssCode] = decode(hashedCodeUrl ?? '').split('|');

  await downloadCode({ htmlCode, jsCode, cssCode, fileName });
  showToast({ content: `${fileName}.zip file has been downloaded!` });
}

export function updateButtonsAvailability({ htmlCode, jsCode, cssCode }) {
  const buttons = [shareUrlButton, downloadCodeButton];
  const hasContent = [htmlCode, jsCode, cssCode].some((value) => value !== '');
  buttons.forEach((button) => (button.disabled = !hasContent));
}

downloadCodeButton.addEventListener('click', handleDownloadCode);
shareUrlButton.addEventListener('click', handleCopyUrl);
