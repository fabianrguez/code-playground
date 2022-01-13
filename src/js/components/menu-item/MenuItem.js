import { html, LitElement } from 'lit';
import windowPreview from '../../WindowPreview';
import { MenuItemStyles } from './MenuItem.styles';

export class MenuItem extends LitElement {
  constructor() {
    super();
    this.actions = {
      'open-external-window': () => {
        windowPreview.open();
      },
      modal: (action) => {
        const [_, showSection] = action.split('-');
        const playgroundModal = document.querySelector('playground-modal');
        playgroundModal.toggleModal({ showSection });
      },
    };
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
    if (action.startsWith('modal')) {
      this.actions.modal(action);
    } else {
      this.actions[action]();
    }
  };

  render() {
    return html`<button
      class="menu-btn"
      title="${this.label}"
      data-action="${this.action}"
      @click="${this.handleClick}"
    >
      <span role="tooltip" class="menu-btn__tooltip">${this.label}</span>
      <slot name="icon"></slot>
    </button>`;
  }
}
