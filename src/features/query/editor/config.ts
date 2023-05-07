import { EditorView } from 'codemirror';
import { customTheme } from 'app/config';

const BASIC_SETUP_OPTIONS = {
  lineNumbers: true,
  highlightActiveLineGutter: false,
  foldGutter: true,
  dropCursor: true,
  allowMultipleSelections: true,
  indentOnInput: true,
  bracketMatching: true,
  closeBrackets: true,
  autocompletion: true,
  rectangularSelection: false,
  crosshairCursor: true,
  highlightActiveLine: false,
  highlightSelectionMatches: true,
  closeBracketsKeymap: true,
  foldKeymap: true,
  completionKeymap: true,
  lintKeymap: true,
};

const colorPrimary = customTheme.token?.colorPrimary || '#281E5B';
const colorBgBase = customTheme.token?.colorBgBase || '#ffffff';
const colorBgSecondary = '#f1f2f4';

const APP_THEME = EditorView.theme({
  '&': {
    color: colorPrimary,
    fontSize: '16px',
    fontWeight: 500,
  },
  '.cm-content': {
    caretColor: colorPrimary,
  },
  '&.cm-focused': {
    outline: 'none',
  },
  '.cm-gutters': {
    backgroundColor: 'transparent',
    border: 'none',
    userSelect: 'none',
  },
  '.cm-lineNumbers': {
    minWidth: '1.8rem',
  },
  '.cm-selectionLayer .cm-selectionBackground': {
    background: 'transparent',
  },
  '.cm-tooltip': {
    backgroundColor: '#fff',
    color: colorPrimary,
    border: 'none',
    padding: '5px',
    borderRadius: '6px',
    boxShadow:
      '0px 6px 20px rgba(59, 76, 106, 0.13), 0px 1.34018px 4.46726px rgba(59, 76, 106, 0.0774939), 0px 0.399006px 1.33002px rgba(59, 76, 106, 0.0525061)',
  },
  '.cm-tooltip-hover': {
    backgroundColor: colorBgSecondary,
  },
  '.cm-tooltip.cm-tooltip-cursor': {
    backgroundColor: colorBgBase,
  },
  '.cm-tooltip-autocomplete ul li[role="option"]': {
    borderRadius: '4px',
    backgroundColor: '#fff',
    color: colorPrimary,
    padding: '5px',
  },
  '.cm-tooltip-autocomplete ul li[aria-selected]': {
    backgroundColor: `hsla(293, 100%, 27%, 0.1);`,
    color: '#770088',
    padding: '5px',
  },
  '.cm-tooltip-autocomplete ul': {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
  },
});

export { BASIC_SETUP_OPTIONS, APP_THEME };