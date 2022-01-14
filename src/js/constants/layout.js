export const LAYOUTS = {
  default: {
    columnGutters: [
      {
        track: 1,
        element: '.first-gutter',
      },
      {
        track: 1,
        element: '.extra-gutter',
      },
    ],
    rowGutters: [
      {
        track: 1,
        element: '.second-gutter',
      },
      {
        track: 1,
        element: '.extra-gutter',
      },
    ],
  },
  'one-row': {
    columnGutters: [
      {
        track: 1,
        element: '.first-gutter',
      },
      {
        track: 3,
        element: '.second-gutter',
      },
      {
        track: 5,
        element: '.extra-gutter',
      },
    ],
  },
  'editors-up': {
    columnGutters: [
      {
        track: 1,
        element: '.first-gutter',
      },
      {
        track: 3,
        element: '.second-gutter',
      },
    ],
    rowGutters: [
      {
        track: 1,
        element: '.extra-gutter',
      },
    ],
  },
};
