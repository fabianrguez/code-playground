import { DEFAULT_LAYOUT } from './layout';

const DEFAULT_FILENAME = 'code-playground';

export const DEFAULT_SETTINGS = {
  theme: 'vs-dark',
  automaticLayout: true,
  fontFamily: "'Cascadia Code PL', 'monospace'",
  fontLigatures: 'on',
  formatOnPaste: true,
  formatOnType: true,
  fontSize: 16,
  lineNumbers: 'on',
  autoIndent: 'advanced',
  tabSize: 2,
  minimap: false,
  padding: {
    top: 16,
  },
  matchBrackets: 'always',
  cursorBlinking: 'expand',
  preserveGrid: false,
  wordWrap: 'on',
  zipInSingleFile: false,
  fileName: DEFAULT_FILENAME,
  layout: {
    splitter: DEFAULT_LAYOUT,
    type: 'default',
  },
};
