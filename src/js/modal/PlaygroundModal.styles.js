import { css } from 'lit';

export const PlaygroundModalStyles = css`
  :host {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: -1;
  }
  :host[open='true'] {
    background: red;
  }
  .modal {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: -1;
    transition: all 0.4s ease;
  }

  .modal[aria-hidden='false'] {
    z-index: 3;
    background: rgba(0, 0, 0, 0.4);
  }
`;
