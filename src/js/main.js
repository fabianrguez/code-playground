import '../css/main.css';
import './components';
import './splitter';
import { debounce, generateHtml } from './utils';
import { subscribe } from './state';
import { create, updateOptions } from './editor';
import { encode } from 'js-base64';

const editorsElements = document.querySelectorAll('code-editor');
const resultIframe = document.querySelector('iframe.result');
const menuButtons = document.querySelectorAll('.menu-btn');
const playgroundModal = document.querySelector('playground-modal');

const debounceUpdate = debounce(update, 200);
const debounceUpdateHash = debounce(updateHash, 500);

subscribe((state) => {
  Object.values(EDITORS).forEach((editor) => {
    const { minimap, ...restOfOptions } = state;

    const newOptions = {
      ...restOfOptions,
      minimap: {
        enabled: minimap,
      },
    };
    updateOptions(editor, newOptions);
  });
});

const EDITORS = [...editorsElements].reduce((acc, editor) => {
  const { language } = editor;
  acc = { ...acc, [language]: create(editor) };
  return acc;
}, {});

Object.values(EDITORS).forEach((editor) => {
  editor.onDidChangeModelContent(debounceUpdate);
});

function update() {
  const { html: htmlEditor, css: cssEditor, javascript: jsEditor } = EDITORS;
  const html = generateHtml({ html: htmlEditor.getValue(), css: cssEditor.getValue(), js: jsEditor.getValue() });
  debounceUpdateHash();
  resultIframe.setAttribute('srcdoc', html);
}

function updateHash() {
  const { html: htmlEditor, css: cssEditor, javascript: jsEditor } = EDITORS;
  const encodedHTML = encode(`${htmlEditor.getValue()}|${jsEditor.getValue()}|${cssEditor.getValue()}`);
  window.history.replaceState(null, null, `?code=${encodedHTML}`);
  
}

function handleClickOutsideModal(e) {
  if (e.target == playgroundModal) {
    playgroundModal.closeModal();
  }
}

menuButtons.forEach((button) => button.addEventListener('click', () => playgroundModal.toggleModal()));
window.addEventListener('click', handleClickOutsideModal);
