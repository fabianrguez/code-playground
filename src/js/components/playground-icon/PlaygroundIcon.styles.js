import { css } from 'lit';

export const PlaygroundIconStyles = css`
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

  .icon-share {
    background-image: url('/assets/icons/share.svg');
  }
`;
