import { decode, encode } from 'js-base64';
import '../css/main.css';
import './components';
import { create, updateOptions } from './editor';
import './splitter';
import './share';
import './download';
import { subscribe, getState } from './state';
import { debounce, generateHtml, getUrlParams, updateUrlCodeParam } from './utils';
import { updateButtonsAvailability } from './share';
import { showToast } from './toast';
import WindowPreview from './WindowPreview';
import { setSplitGrid } from './splitter';

const editorsElements = document.querySelectorAll('code-editor');
const resultIframe = document.querySelector('iframe.result');
const playgroundModal = document.querySelector('playground-modal');
const settingItems = document.querySelectorAll('setting-item');

const debounceUpdate = debounce(update, 200);
const debounceUpdateHash = debounce(updateHash, 500);

const { code: hashedCodeUrl } = getUrlParams();
const [htmlUrlCode, jsUrlCode, cssUrlCode] = decode(hashedCodeUrl ?? '').split('|');

const EDITOR_DEFAULT_VALUE = {
  html: htmlUrlCode,
  javascript: jsUrlCode,
  css: cssUrlCode,
};
const { layout } = getState();

setSplitGrid(layout);

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
  setSplitGrid(state.layout);
});

const EDITORS = [...editorsElements].reduce((acc, editor) => {
  const { language } = editor;
  editor.value = EDITOR_DEFAULT_VALUE[language];
  acc = { ...acc, [language]: create(editor) };

  editor.addEventListener('code-changed', debounceUpdate);

  return acc;
}, {});

function update() {
  const { html: htmlEditor, css: cssEditor, javascript: jsEditor } = EDITORS;
  const html = generateHtml({ html: htmlEditor.getValue(), css: cssEditor.getValue(), js: jsEditor.getValue() });
  debounceUpdateHash();
  updateButtonsAvailability({
    htmlCode: htmlEditor.getValue(),
    cssCode: cssEditor.getValue(),
    jsCode: jsEditor.getValue(),
  });
  WindowPreview.updateContent(html);
  resultIframe.setAttribute('srcdoc', html);
}

function updateHash() {
  const { html: htmlEditor, css: cssEditor, javascript: jsEditor } = EDITORS;
  const areAllEditorsEmpty = [htmlEditor, cssEditor, jsEditor].every((editor) => editor.getValue() === '');
  const encodedHTML = encode(`${htmlEditor.getValue()}|${jsEditor.getValue()}|${cssEditor.getValue()}`);
  updateUrlCodeParam({ value: encodedHTML, removeParam: areAllEditorsEmpty });
}

function handleClickOutsideModal(e) {
  if (e.target == playgroundModal) {
    playgroundModal.closeModal();
  }
}

function handleSettingItemChange(e) {
  const { setting } = e.detail;
  showToast({ content: `${setting} has been updated!` });
}

settingItems.forEach((settingItem) => settingItem.addEventListener('setting-changed', handleSettingItemChange));
window.addEventListener('click', handleClickOutsideModal);
document.addEventListener('DOMContentLoaded', update);
