import { getState } from './state';

const { fontSize, lineNumbers, minimap, theme, wordWrap, fontLigatures, fontFamily, tabSize } = getState();

const COMMON_EDITOR_OPTIONS = {
  fontSize,
  lineNumbers,
  tabSize,
  minimap: {
    enabled: minimap,
  },
  wordWrap,
  theme,
  fontLigatures,
  fontFamily,

  automaticLayout: true,
  fixedOverflowWidgets: true,
  scrollBeyondLastLine: false,
  roundedSelection: false,
  padding: {
    top: 16,
  },
};

export const create = (domElement) => domElement.createEditor({ ...COMMON_EDITOR_OPTIONS });

export const updateOptions = (editor, newOptions) =>
  editor.updateOptions({
    ...editor.getRawOptions(),
    ...newOptions,
  });
