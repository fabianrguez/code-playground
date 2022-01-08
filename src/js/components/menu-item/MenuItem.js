import { html, LitElement } from 'lit';
import { MenuItemStyles } from './MenuItem.styles';

export class MenuItem extends LitElement {
  constructor() {
    super();
  }

  static properties = {
    label: {
      type: String,
    },
    action: {
      type: String,
    },
  };

  static styles = MenuItemStyles;

  handleClick = ({ currentTarget }) => {
    const { action } = currentTarget.dataset;
    const playgroundModal = document.querySelector('playground-modal');
    playgroundModal.toggleModal({ showSection: action });
  };

  render() {
    return html`<button class="menu-btn" title="${this.label}" data-action="${this.action}" @click="${this.handleClick}">
      <span role="tooltip" class="menu-btn__tooltip">${this.label}</span>
      <slot name="icon"></slot>
    </button>`;
  }
}
