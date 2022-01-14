import { html, LitElement } from 'lit';
import { getState } from '../../state';
import { LayoutSelectorStyles } from './LayoutSelector.styles';

const { updateSettings, layout } = getState();

export class LayoutSelector extends LitElement {
  constructor() {
    super();
    this.setting = 'layout';
    this.options = [
      {
        label: 'default',
        value: 'default',
      },
      {
        label: 'one row',
        value: 'one-row',
      },
      {
        label: 'editors up',
        value: 'editors-up',
      },
    ];
  }

  static properties = {
    onChangeLayout: {
      type: Function,
      attribute: true,
    },
    value: {
      type: String,
      attribute: true,
    },
  };

  static styles = LayoutSelectorStyles;

  firstUpdated() {
    const radioButtons = this.renderRoot.querySelectorAll('input[type=radio]');
    radioButtons.forEach((element) => element.value === this.value && (element.checked = true));
  }

  willUpdate(changedProperties) {
    if (changedProperties.has('value')) {
      const radioButtons = this.renderRoot.querySelectorAll('input[type=radio]');
      radioButtons?.forEach((element) => element.value === this.value && (element.checked = true));
    }
  }

  getIcon(value) {
    if (value === 'default') {
      return html`
        <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.75" y="0.75" width="14.5" height="14.5" rx="1.25" stroke="#ffffff" stroke-width="1.5" />
          <rect x="0.75" y="19.75" width="14.5" height="14.5" rx="1.25" stroke="#ffffff" stroke-width="1.5" />
          <rect x="20.75" y="0.75" width="14.5" height="14.5" rx="1.25" stroke="#ffffff" stroke-width="1.5" />
          <rect x="20.75" y="19.75" width="14.5" height="14.5" rx="1.25" stroke="#ffffff" stroke-width="1.5" />
        </svg>
      `;
    } else if (value === 'one-row') {
      return html`<svg width="37" height="35" viewBox="0 0 37 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.75" y="0.75" width="6.5" height="33.5" rx="1.25" stroke="#FFFFFF" stroke-width="1.5" />
        <rect x="29.75" y="0.75" width="6.5" height="33.5" rx="1.25" stroke="#FFFFFF" stroke-width="1.5" />
        <rect x="20.75" y="0.75" width="5.5" height="33.5" rx="1.25" stroke="#FFFFFF" stroke-width="1.5" />
        <rect x="10.75" y="0.75" width="5.5" height="33.5" rx="1.25" stroke="#FFFFFF" stroke-width="1.5" />
      </svg>`;
    } else if (value === 'editors-up') {
      return html`
        <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.75" y="0.75" width="8.5" height="14.5" rx="1.25" stroke="white" stroke-width="1.5" />
          <rect x="12.75" y="0.75" width="9.5" height="14.5" rx="1.25" stroke="white" stroke-width="1.5" />
          <rect x="26.75" y="0.75" width="8.5" height="14.5" rx="1.25" stroke="white" stroke-width="1.5" />
          <rect x="0.75" y="19.75" width="34.5" height="14.5" rx="1.25" stroke="white" stroke-width="1.5" />
        </svg>
      `;
    }
  }

  handleChange = (e) => {
    e.preventDefault();
    this.onChangeLayout(e);
  };

  render() {
    return html`
      <div class="layout-selector__container">
        ${this.options.map(
          ({ label, value }) => html`
            <label class="layout-selector__type" title="${label}" @change="${this.handleChange}">
              <input type="radio" data-for="layout" name="layout" value="${value}" />
              ${this.getIcon(value)}
            </label>
          `
        )}
      </div>
    `;
  }
}
