import { copyToClipboard, getUrlParams } from './utils';
import { showToast } from './toast';
import { downloadCode } from './download';
import { decode } from 'js-base64';
import { getState } from './state';

const shareUrlButton = document.querySelector('.share-btn.copy-link');
const downloadCodeButton = document.querySelector('.share-btn.download-code');

const SHORT_URL_API = 'https://api.shrtco.de/v2/';

async function getShortenUrl() {
  const url = window.location.href;
  if (url.includes('localhost:3000')) {
    url.replace('localhost:3000', 'code-playground.vercel.app');
  }
  const response = await fetch(`${SHORT_URL_API}/shorten?url=${url}`);
  return await response.json();
}

async function handleCopyUrl() {
  const { result } = await getShortenUrl();
  copyToClipboard(result?.short_link);
  showToast({ content: 'URL copied to clipboard!' });
}

async function handleDownloadCode() {
  const { fileName, zipInSingleFile } = getState();
  const { code: hashedCodeUrl } = getUrlParams();
  const [htmlCode, jsCode, cssCode] = decode(hashedCodeUrl ?? '').split('|');

  await downloadCode({ htmlCode, jsCode, cssCode, fileName, zipInSingleFile });
  showToast({ content: `${fileName}.zip file has been downloaded!` });
}

export function updateButtonsAvailability({ htmlCode, jsCode, cssCode }) {
  const buttons = [shareUrlButton, downloadCodeButton];
  const hasContent = [htmlCode, jsCode, cssCode].some((value) => value !== '');
  buttons.forEach((button) => {
    button.disabled = !hasContent;
  });
}

function initButtonsDisabledTooltip() {
  const buttons = [shareUrlButton, downloadCodeButton];
  buttons.forEach((button) => {
    const tooltip = button.querySelector('.tooltip');
    tooltip.textContent === '' && (tooltip.textContent = 'Starts writing code to enable this button');
  });
}

downloadCodeButton.addEventListener('click', handleDownloadCode);
shareUrlButton.addEventListener('click', handleCopyUrl);
document.addEventListener('DOMContentLoaded', initButtonsDisabledTooltip);
