import { css } from 'lit';

export const SettingItemStyles = css`
  .setting__item {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .setting__item .type {
    opacity: 0.6;
  }

  .setting__item input,
  .setting__item select {
    max-width: 100px;
    font-size: 18px;
    padding-left: 0.5rem;
  }
`;
