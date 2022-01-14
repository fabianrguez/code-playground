import Split from 'split-grid';
import { GRID_LAYOUT } from './constants';

let split;

const formatGutters = (gutter) => ({
  ...gutter,
  element: document.querySelector(gutter?.element),
});

export function setSplitGrid({ gutters, type }) {
  const playgrondElement = document.querySelector('.playground');
  playgrondElement.setAttribute('style', GRID_LAYOUT[type]);
  playgrondElement.setAttribute('data-layout', type);

  if (split) {
    split.destroy();
  }

  const splitConfig = {
    ...gutters,
    ...(gutters.columnGutters && { columnGutters: gutters.columnGutters.map(formatGutters) }),
    ...(gutters.rowGutters && { rowGutters: gutters.rowGutters.map(formatGutters) }),
  };

  split = Split(splitConfig);
}
