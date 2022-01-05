import { LitElement, html, css } from 'lit';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import * as monaco from 'monaco-editor';
import { registerAutoCompleteHTMLTag } from '../utils';
import { emmetCSS, emmetHTML, emmetJSX } from 'emmet-monaco-es';
import { CodeEditorStyle } from './CodeEditor.styles';

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

  createEditor() {
    this.editor = monaco.editor.create(this, {
      value: this.value,
      language: this.language,
      theme: 'vs-dark',
      automaticLayout: true,
      fontFamily: "'Cascadia Code PL', 'Menlo', 'Monaco', 'Courier New', 'monospace'",
      fontLigatures: 'on',
      formatOnPaste: true,
      formatOnType: true,
      fontSize: 18,
      lineNumbers: 'on',
      autoIndent: 'advanced',
      tabSize: 2,
      minimap: {
        enabled: false,
      },
      padding: {
        top: 16
      },
      matchBrackets: 'always',
      cursorBlinking: 'expand',
      preserveGrid: false,
      wordWrap: 'on',
      zipInSingleFile: false,
      layout: {
        type: 'default',
      },
    });

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
      this.isInitialized = true;
    }
  }
}
