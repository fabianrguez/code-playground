import { html, LitElement } from 'lit';
import { PlaygroundModalStyles } from './PlaygroundModal.styles';

export class PlaygroundModal extends LitElement {
  constructor() {
    super();
  }

  static properties = {
    hidden: {
      type: Boolean,
      reflect: true,
      attribute: true,
    },
  };

  static styles = PlaygroundModalStyles;

  get _modalContent() {
    return this.renderRoot.querySelector('.modal__content');
  }

  removeSlideOutAnimation({ target }) {
    if (target.classList.contains('slide-out')) {
      target.classList.remove('slide-out');
      this.hidden = true;
    }
  }

  toggleModal() {
    if (!this.hidden) {
      this.closeModal();
    } else {
      this.hidden = false;
    }
  }

  closeModal() {
    this._modalContent.classList.add('slide-out');
  }

  render() {
    return html`
      <div class="modal__content" @animationend="${this.removeSlideOutAnimation}">
        <span class="close" @click="${this.closeModal}">&times;</span>
        <slot name="content"></slot>
      </div>
    `;
  }
}
