import { LitElement, html, css } from 'lit';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import * as monaco from 'monaco-editor';
import { registerAutoCompleteHTMLTag } from '../utils';
import { emmetHTML } from 'emmet-monaco-es';

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
    return css`
      :host {
        position: relative;
        overflow: hidden;
      }
      :host::after {
        content: '';
        position: absolute;
        background-repeat: no-repeat;
        right: 16px;
        bottom: 16px;
        z-index: 1;
        width: 48px;
        height: 48px;
      }
    `;
  }

  render() {
    return html`<slot></slot>`;
  }

  createEditor() {
    this.editor = monaco.editor.create(this, {
      value: this.value,
      language: this.language,
      theme: 'vs-dark',
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

      emmetHTML(monaco);
      registerAutoCompleteHTMLTag(monaco);
      this.isInitialized = true;
    }
  }
}
