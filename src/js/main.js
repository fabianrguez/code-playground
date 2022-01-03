import '../css/main.css';
import './editor';
import './modal';
import { debounce, generateHtml } from './utils';

const editorsElements = document.querySelectorAll('code-editor');
const resultIframe = document.querySelector('iframe.result');
const menuButtons = document.querySelectorAll('.menu .menu-btn');
const modalElement = document.querySelector('playground-modal');

const debounceUpdate = debounce(update, 200);

const EDITORS = [...editorsElements].reduce((acc, editor) => {
  const { language } = editor;
  acc = { ...acc, [language]: editor.createEditor() };
  return acc;
}, {});

function update() {
  const { html: htmlEditor, css: cssEditor, javascript: jsEditor } = EDITORS;
  const html = generateHtml({ html: htmlEditor.getValue(), css: cssEditor.getValue(), js: jsEditor.getValue() });
  resultIframe.setAttribute('srcdoc', html);
}

Object.values(EDITORS).forEach((editor) => {
  editor.onDidChangeModelContent(debounceUpdate);
});

menuButtons.forEach((button) =>
  button.addEventListener('click', () => {
    modalElement.open();
    console.dir(modalElement);
  })
);
