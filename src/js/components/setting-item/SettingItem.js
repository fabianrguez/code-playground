import { html, LitElement } from 'lit';
import { getState } from '../../state';
import { SettingItemStyles } from './SettingItem.styles';
import { LAYOUTS, GRID_LAYOUT } from '../../constants';

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
      selectedOption?.setAttribute('selected', '');
    } else if (this.type === 'checkbox') {
      const checkbox = this.renderRoot.querySelector('input[type=checkbox]');
      checkbox.checked = this.value;
    }
  }

  static styles = SettingItemStyles;

  settingChangedEvent = () => {
    const event = new CustomEvent('setting-changed', { detail: { setting: this.label } });
    this.dispatchEvent(event);
  };

  handleChange = ({ target }) => {
    const { value, checked, type } = target;
    const { for: settingKey } = target.dataset;
    let _value = type === 'checkbox' ? checked : value;

    if (this.type === 'layout') {
      _value = {
        type: value,
        gutters: { ...LAYOUTS[value] },
        style: GRID_LAYOUT[value],
      };
    }
    updateSettings({ key: settingKey, value: _value });
    this.settingChangedEvent();
  };

  getSettingType = () => {
    if (this.type === 'number' || this.type === 'text') {
      return html`
        <input
          @change="${this.handleChange}"
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
          ${this.options?.map(({ label, value }) => html`<option value="${value}">${label}</option>`)}
        </select>
      `;
    } else if (this.type === 'checkbox') {
      return html` <label class="checkbox">
        <input type="checkbox" data-for="${this.setting}" @change="${this.handleChange}"></input>
        ${this.description}
      </label> `;
    } else if (this.type === 'layout') {
      return html`<layout-selector
        value="${this.value?.type}"
        .onChangeLayout="${this.handleChange}"
      ></layout-selector>`;
    }
  };

  render() {
    return html`
      <div class="setting__item">
        <strong><span class="type">${this.settingType}:</span> ${this.label}</strong>
        ${this.type !== 'checkbox' ? this.description : ''} ${this.getSettingType()}
      </div>
    `;
  }
}
