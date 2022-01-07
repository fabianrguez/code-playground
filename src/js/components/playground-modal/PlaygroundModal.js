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

  get _slottedChildren() {
    const slot = this.shadowRoot.querySelector('slot');
    return slot.assignedElements({ flatten: true });
  }

  removeSlideOutAnimation({ target }) {
    if (target.classList.contains('slide-out')) {
      target.classList.remove('slide-out');
      this.hidden = true;
    }
  }

  showModalSection(section) {
    this._slottedChildren.forEach((child) => {
      const { section: eventSection } = child.dataset;
      eventSection === section ? child.classList.remove('hide') : child.classList.add('hide');
    });
  }

  toggleModal({ showSection }) {
    if (!this.hidden) {
      this.closeModal();
    } else {
      this.showModalSection(showSection);
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
