import { ThemeConfig } from 'antd';

// App title
export const appTitle = 'GraphiQL';

// Test color config, here we can setup theme config for Ant Design
export const customTheme: ThemeConfig = {
  token: {
    colorTextHeading: '#3b4b68', // Dark blue
    colorText: '#3b4b68',
    colorInfo: '#D60690', // pink
    colorPrimary: '#1b2240', // dark-blue from apollo
    colorBgBase: '#ffffff',
  },
};
