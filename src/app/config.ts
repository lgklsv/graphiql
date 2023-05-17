import { ThemeConfig } from 'antd';

// Test color config, here we can setup theme config for Ant Design
export const customTheme: ThemeConfig = {
  token: {
    colorTextHeading: '#281E5B', // Dark blue
    colorPrimary: '#281E5B',
    colorText: '#281E5B',
    // colorInfo: '#7156d9b8',
    colorInfo: '#281E5B',
    colorBgBase: '#ffffff',
    colorTextSecondary: '#6F7A8F',
  },
};

export const appTitle = 'GraphiQL';

export const DEBOUNCE_DELAY = 250;
export const EASING = [0.6, -0.05, 0.01, 0.99];
export const TRANSITION = {
  type: 'spring',
  bounce: 0.3,
  delay: 0.05,
  ease: EASING,
};

export const DEFAULT_VARIABLES_EDITOR_HEIGHT_CLOSED = 56;
export const DEFAULT_VARIABLES_EDITOR_HEIGHT_OPEN = 300;
export const QUERY_FIELD_MIN_WIDTH = 350;
export const DEFAULT_QUERY_FIELD_WIDTH =
  window.innerWidth * 0.33 > QUERY_FIELD_MIN_WIDTH
    ? window.innerWidth * 0.33
    : QUERY_FIELD_MIN_WIDTH;

export const BASE_URL = 'https://countries.trevorblades.com/';
// export const BASE_URL = 'https://spacex-production.up.railway.app/';

export const SHORTCUTS = {
  search: ['ctrl+k', 'meta+k'],
  execute: ['ctrl+enter', 'meta+enter'],
  prettify: ['shift+ctrl+p', 'shift+meta+p'],
  copy: ['shift+ctrl+c', 'shift+meta+c'],
  refetch: ['shift+ctrl+r', 'shift+meta+r'],
};
