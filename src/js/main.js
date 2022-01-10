import { decode, encode } from 'js-base64';
import '../css/main.css';
import './components';
import { create, updateOptions } from './editor';
import './splitter';
import './share';
import { subscribe } from './state';
import { debounce, generateHtml, getUrlParams, updateUrlCodeParam } from './utils';

const editorsElements = document.querySelectorAll('code-editor');
const resultIframe = document.querySelector('iframe.result');
const playgroundModal = document.querySelector('playground-modal');

const debounceUpdate = debounce(update, 200);
const debounceUpdateHash = debounce(updateHash, 500);

const { code: hashedCodeUrl } = getUrlParams();
const [htmlUrlCode, jsUrlCode, cssUrlCode] = decode(hashedCodeUrl ?? '').split('|');

const EDITOR_DEFAULT_VALUE = {
  html: htmlUrlCode,
  javascript: jsUrlCode,
  css: cssUrlCode,
};

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
  editor.value = EDITOR_DEFAULT_VALUE[language];
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
  if ([htmlEditor, cssEditor, jsEditor].some((editor) => editor.getValue() !== '')) {
    const encodedHTML = encode(`${htmlEditor.getValue()}|${jsEditor.getValue()}|${cssEditor.getValue()}`);
    updateUrlCodeParam(encodedHTML);
  }
}

function handleClickOutsideModal(e) {
  if (e.target == playgroundModal) {
    playgroundModal.closeModal();
  }
}

window.addEventListener('click', handleClickOutsideModal);
document.addEventListener('DOMContentLoaded', update);
