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

  toggle() {
    this.open = !this.open;
  }

  render() {
    console.log({ isOpen: this.open });
    return html`
      <section class="modal" aria-hidden="${!this.open}">
        <div class="modal__content">Test</div>
      </section>
    `;
  }
}
