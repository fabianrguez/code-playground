import { html, LitElement } from 'lit';
import { PlaygroundIconStyles } from './PlaygroundIcon.styles';

export class PlaygroundIcon extends LitElement {
  constructor() {
    super();
  }

  static properties = {
    icon: {
      type: String,
    },
  };

  static styles = PlaygroundIconStyles;

  render() {
    return html`<div class="icon icon-${this.icon}"></div>`;
  }
}
