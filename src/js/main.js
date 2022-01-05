import '../css/main.css';
import './components/editor';
import './splitter';
import './settings';
import { debounce, generateHtml } from './utils';
import { toggleModal } from './modal';
import { subscribe } from './state';
import { create } from './editor';

const editorsElements = document.querySelectorAll('code-editor');
const resultIframe = document.querySelector('iframe.result');
const menuButtons = document.querySelectorAll('.menu .menu-btn');

const debounceUpdate = debounce(update, 200);

subscribe((state) => {
  Object.values(EDITORS).forEach((editor) => {
    const { minimap, ...restOfOptions } = state;

    const newOptions = {
      ...restOfOptions,
      minimap: {
        enabled: minimap,
      },
    };

    editor.updateOptions({
      ...editor.getRawOptions(),
      ...newOptions,
    });
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
  resultIframe.setAttribute('srcdoc', html);
}

menuButtons.forEach((button) => button.addEventListener('click', toggleModal));
window.addEventListener('click', (e) => {
  const modal = document.querySelector('.modal');
  if (e.target == modal) {
    modal.setAttribute('aria-hidden', 'true');
  }
});
