import { css } from 'lit';

export const PlaygroundModalStyles = css`
  :host {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: -1;
    font-family: 'Cascadia Code PL', monospace;
  }
  :host([open='true']) {
    z-index: 3;
  }
  .modal {
    position: absolute;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: grid;
    place-items: center;
  }

  .modal__content {
    padding: 1rem;
    min-height: 200px;
    min-width: 400px;
    border-radius: 6px;
    box-shadow: -4px 1px 7px 1px rgba(0 ,0, 0 ,0.4)
    transform: scale(0.6);
    opacity: 0;
    visibility: hidden;
    background: var(--menu-background);
    color: var(--white);
    transition: all 0.4s ease;
  }

  .modal[aria-hidden='false'] .modal__content {
    opacity: 1;
    transform: scale(1);
    visibility: visible;
  }
`;
