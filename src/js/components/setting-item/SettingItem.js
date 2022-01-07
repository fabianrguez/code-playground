import { html, LitElement } from 'lit';
import { SettingItemStyles } from './SettingItem.styles';
import { getState } from '../../state';

const { updateSettings, ...settings } = getState();

export class SettingItem extends LitElement {
  constructor() {
    super();
  }

  static properties = {
    settingType: {
      type: String,
    },
    label: {
      type: String,
    },
    description: {
      type: String,
    },
    setting: {
      type: String,
    },
    value: {
      type: String,
    },
    min: {
      type: String,
    },
    max: {
      type: String,
    },
    type: {
      type: String,
    },
    options: {
      type: Array,
    },
  };

  firstUpdated() {
    this.value = settings[this.setting];
    if (this.type === 'select') {
      const selectedOption = this.renderRoot.querySelector(`option[value=${this.value}]`);
      selectedOption.setAttribute('selected', '');
    }
  }

  static styles = SettingItemStyles;

  handleChange = ({ target }) => {
    const { value, checked, type } = target;
    const { for: settingKey } = target.dataset;
    let _value = type === 'checkbox' ? checked : value;

    updateSettings({ key: settingKey, value: _value });
  };

  getSettingType = () => {
    if (this.type === 'number' || this.type === 'checkbox') {
      return html`
        <input
          @input="${this.handleChange}"
          data-for="${this.setting}"
          class="${this.type}"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          type="${this.type}"
          wrap="off"
          value="${this.value}"
          min="${this.min}"
          max="${this.max}"
          step="1"
        />
      `;
    } else if (this.type === 'select') {
      return html`
        <select data-for="${this.setting}" @change="${this.handleChange}">
          ${this.options?.map(({ label, value }) => {
            const isSelected = this.value === value;
            return html`<option value="${value}">${label}</option>`;
          })}
        </select>
      `;
    }
  };

  render() {
    return html`
      <div class="setting__item">
        <strong><span class="type">${this.settingType}:</span> ${this.label}</strong>
        ${this.description} ${this.getSettingType()}
      </div>
    `;
  }
}
