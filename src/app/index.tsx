import React from 'react';
import { Helmet } from 'react-helmet';
import { ConfigProvider } from 'antd';

import Routing from 'pages';
import { appTitle, customTheme } from './config';
import './index.scss';

const App: React.FC = () => {
  return (
    <ConfigProvider theme={customTheme}>
      <Helmet defaultTitle={appTitle} titleTemplate={`%s | ${appTitle}`} />
      <Routing />
    </ConfigProvider>
  );
};

export default App;
