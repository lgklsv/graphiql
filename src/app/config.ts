import { ThemeConfig } from 'antd';

// App title
export const appTitle = 'GraphiQL';

// Test color config, here we can setup theme config for Ant Design
export const customTheme: ThemeConfig = {
  token: {
    colorTextHeading: '#281E5B', // Dark blue
    colorText: '#281E5B',
    colorInfo: '#7156d9b8',
    colorBgBase: '#ffffff',
    colorPrimary: '#281E5B',
  },
};

export const DEFAULT_VARIABLES_EDITOR_HEIGHT_CLOSED = 56;
export const DEFAULT_VARIABLES_EDITOR_HEIGHT_OPEN = 300;
export const QUERY_FIELD_MIN_WIDTH = 340;
