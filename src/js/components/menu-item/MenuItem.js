import { html, LitElement } from 'lit';
import { MenuItemStyles } from './MenuItem.styles';
import '../playground-icon';

export class MenuItem extends LitElement {
  constructor() {
    super();
  }

  static properties = {
    label: {
      type: String,
    },
    icon: {
      type: String,
    },
    action: {
      type: String,
    },
  };

  static styles = MenuItemStyles;

  handleClick = ({ currentTarget }) => {
    console.log(currentTarget);
    const { action } = currentTarget.dataset;
    const playgroundModal = document.querySelector('playground-modal');
    playgroundModal.toggleModal({ showSection: action });
  };

  render() {
    return html`<button class="menu-btn" title="${this.label}" data-action="${this.action}" @click="${this.handleClick}">
      <span role="tooltip" class="menu-btn__tooltip">${this.label}</span>
      <playground-icon icon="${this.icon}">
    </button>`;
  }
}
