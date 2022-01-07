import { css } from 'lit';

export const MenuItemStyles = css`
  .menu-btn {
    border: 0;
    font-size: 16px;
    background: transparent;
    color: var(--white);
    cursor: pointer;
    opacity: 0.7;
    position: relative;
    transition: opacity 0.1s ease;
  }

  .menu-btn:hover {
    opacity: 1;
  }

  .menu-btn:hover .menu-btn__tooltip {
    display: block;
  }

  .menu-btn__tooltip {
    background: #2d323c;
    border-radius: 3px;
    border: 1px solid #000;
    box-shadow: 0 0 15px 2px #0000004d;
    color: var(--light-gray);
    display: none;
    font-size: 1.1em;
    padding: 0.5em 0.75em;
    position: absolute;
    right: -10px;
    transform: translate(100%);
    z-index: 2;
  }

  .menu-btn__tooltip:after,
  .menu-btn__tooltip:before {
    content: '';
    position: absolute;
    transform: translate(-100%, -50%);
    top: 50%;
    left: 0px;
    right: 0;
    width: 0px;
    height: 0px;
    border-top: 0.5em solid transparent;
    border-bottom: 0.5em solid transparent;
    border-right: 0.5em solid #000;
  }

  .menu-btn__tooltip:after {
    border-right: 0.5em solid #2d323c;
  }

  .icon {
    height: 46px;
    width: 46px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
    color: var(--white);
  }

  .icon-settings {
    background-image: url('/assets/icons/settings.svg');
  }

  @media (max-width: 600px) {
    .menu-btn:hover .menu-btn__tooltip {
      display: none;
    }
  }
`;
