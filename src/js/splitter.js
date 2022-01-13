import Split from 'split-grid';

let split;

const formatGutters = (gutter) => ({
  ...gutter,
  element: document.querySelector(gutter?.element),
});

export function setSplitGrid(layout) {
  // document.querySelector('.playground').setAttribute('style', 'grid-template-columns:1fr 5px 1fr 5px 1fr 5px 1fr;');
  if (split) {
    split.destroy(true);
  }

  const splitConfig = {
    ...layout,
    ...(layout.columnGutters && { columnGutters: layout.columnGutters.map(formatGutters) }),
    ...(layout.rowGutters && { rowGutters: layout.rowGutters.map(formatGutters) }),
  };

  split = Split(splitConfig);
}
