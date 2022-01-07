import { css } from 'lit';

export const PlaygroundModalStyles = css`
  :host {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
    -webkit-animation-name: fadeIn;
    -webkit-animation-duration: 0.4s;
    animation-name: fadeIn;
    animation-duration: 0.4s;
  }

  :host([hidden]) {
    display: none;
  }

  .modal__content {
    display: flex;
    flex-direction: column;
    position: fixed;
    bottom: 0;
    background-color: var(--menu-background);
    color: var(--white);
    width: 100%;
    padding: 0.75rem 2rem 1rem;
    box-sizing: border-box;
    -webkit-animation-name: slideIn;
    -webkit-animation-duration: 0.4s;
    animation-name: slideIn;
    animation-duration: 0.4s;
  }

  .close {
    color: #aaa;
    font-size: 28px;
    font-weight: bold;
    align-self: flex-end;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  @media (max-width: 600px) {
    .modal__content {
      height: 100%;
    }
  }

  .slide-out {
    -webkit-animation: slideOut 0.4s !important;
    animation: slideOut 0.4s !important;
  }

  @-webkit-keyframes slideIn {
    from {
      bottom: -300px;
      opacity: 0;
    }
    to {
      bottom: 0;
      opacity: 1;
    }
  }

  @keyframes slideIn {
    from {
      bottom: -300px;
      opacity: 0;
    }
    to {
      bottom: 0;
      opacity: 1;
    }
  }

  @-webkit-keyframes slideOut {
    from {
      bottom: 0;
      opacity: 1;
    }
    to {
      bottom: -300px;
      opacity: 0;
    }
  }

  @keyframes slideOut {
    from {
      bottom: 0;
      opacity: 1;
    }
    to {
      bottom: -300px;
      opacity: 0;
    }
  }

  @-webkit-keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
