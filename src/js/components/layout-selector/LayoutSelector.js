import { css, html, LitElement } from 'lit';
import { GRID_LAYOUT, LAYOUTS } from '../../constants';
import { getState } from '../../state';

const { updateSettings, layout } = getState();

export class LayoutSelector extends LitElement {
  constructor() {
    super();
    this.setting = 'layout';
    this.options = [
      { label: 'default', value: 'default' },
      { label: 'one row', value: 'one-row' },
      { label: 'editors up', value: 'editors-up' },
    ];
  }

  static properties = {
    onChangeLayout: {
      type: Function,
    },
  };

  static styles = css`
    :host {
      width: 100%;
    }
    select {
      max-width: 200px;
      font-size: 18px;
      padding-left: 0.5rem;
      width: inherit;
      font-family: 'Cascadia Code PL', monospace;
    }
  `;

  firstUpdated() {
    const selectedOption = this.renderRoot.querySelector(`option[value=${layout.type}]`);
    selectedOption?.setAttribute('selected', '');
  }

  handleChange = (e) => {
    e.preventDefault();
    this.onChangeLayout(e);
  };

  render() {
    return html`
      <select @change="${this.handleChange}" data-for="${this.setting}">
        ${this.options?.map(({ label, value }) => html`<option value="${value}">${label}</option>`)}
      </select>
    `;
  }
}
