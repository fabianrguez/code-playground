import { LitElement, html } from 'lit';
import { PlaygroundModalStyles } from './PlaygroundModal.styles';

export class PlaygroundModal extends LitElement {
  constructor() {
    super();
  }
  static properties = {
    open: {
      type: Boolean,
    },
    isOpen: {
      state: true,
    },
  };

  static get styles() {
    return PlaygroundModalStyles;
  }

  open() {
    this.open = true;
    this.setAttribute('open', true);
  }

  close() {
    this.open = false;
    this.setAttribute('open', false);
  }

  render() {
    return html`
      <section class="modal" aria-hidden="${!this.open ?? true}">
        <div class="modal__content">Test</div>
      </section>
    `;
  }
}
