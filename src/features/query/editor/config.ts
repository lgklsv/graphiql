import { EditorView } from 'codemirror';
import { buildClientSchema, getIntrospectionQuery } from 'graphql';
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
  searchKeymap: true,
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
  },
  '.cm-selectionLayer .cm-selectionBackground': {
    background: 'transparent',
  },
  '.cm-tooltip': {
    backgroundColor: colorBgSecondary,
    color: colorPrimary,
    border: 'none',
    padding: '2px 7px',
    borderRadius: '4px',
  },
  '.cm-tooltip-hover': {
    backgroundColor: colorBgSecondary,
  },
  '.cm-tooltip.cm-tooltip-cursor': {
    backgroundColor: colorBgBase,
  },
});

// TO DELETE WHEN SCHEMA IS FETCHED ON TOP-LEVEL, PASS THE SCHEME TO EDITOR FROM STORE

const getSchema = async () => {
  const resonse = await fetch('https://countries.trevorblades.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
      ${getIntrospectionQuery()}`,
      variables: {},
    }),
  });
  const schemaResponse = await resonse.json();
  const schemaInstance = buildClientSchema(schemaResponse.data);
  return schemaInstance;
};

export { BASIC_SETUP_OPTIONS, APP_THEME, getSchema };
