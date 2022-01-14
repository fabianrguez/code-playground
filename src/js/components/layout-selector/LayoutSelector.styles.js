import { css } from 'lit';

export const LayoutSelectorStyles = css`
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
  .layout-selector__container {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 0.5rem;
  }

  .layout-selector__type {
    cursor: pointer;
  }

  .layout-selector__type svg {
    padding: 0.5rem;
    border-radius: 4px;
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
    transition: all 0.4s ease;
  }

  .layout-selector__type:hover svg {
    transform: scale(1.1);
  }
  input[type='radio'] {
    position: absolute;
    transform: scale(0);
  }

  input[type='radio']:checked + svg {
    border-color: #ffffff;
  }
`;
