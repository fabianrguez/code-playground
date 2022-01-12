import { emmetCSS, emmetHTML, emmetJSX } from 'emmet-monaco-es';
import { html, LitElement } from 'lit';
import * as monaco from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import { registerAutoCompleteHTMLTag } from '../../utils';
import { CodeEditorStyle } from './CodeEditor.styles';
import cssFormatMonaco from 'css-format-monaco';

export class CodeEditor extends LitElement {
  constructor() {
    super();
    this.constructor.init();
  }

  static get properties() {
    return {
      language: {
        type: String,
        reflects: true,
      },
      value: {
        type: String,
      },
    };
  }

  static get styles() {
    return CodeEditorStyle;
  }

  render() {
    return html`<slot></slot>`;
  }

  changeCodeEvent = () => {
    const codeChangedEvent = new Event('code-changed');
    this.dispatchEvent(codeChangedEvent);
  };

  createEditor(options = {}) {
    this.editor = monaco.editor.create(this, {
      value: this.value,
      language: this.language,
      ...options,
    });

    this.editor.onDidChangeModelContent(this.changeCodeEvent);

    return this.editor;
  }

  static init() {
    if (!this.isInitialized) {
      window.MonacoEnvironment = {
        getWorker(_, label) {
          switch (label) {
            case 'html':
              return new HtmlWorker();
            case 'javascript':
              return new JsWorker();
            case 'css':
              return new CssWorker();
            default:
              return new EditorWorker();
          }
        },
      };

      emmetJSX(monaco);
      emmetCSS(monaco);
      emmetHTML(monaco);
      registerAutoCompleteHTMLTag(monaco);
      cssFormatMonaco(monaco, { indent_size: 2, indent_with_tabs: false });
      this.isInitialized = true;
    }
  }
}
