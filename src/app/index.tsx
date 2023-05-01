import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ConfigProvider } from 'antd';

import Routing from 'pages';
import { appTitle, customTheme } from './config';
import './index.scss';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ConfigProvider theme={customTheme}>
        <Helmet defaultTitle={appTitle} titleTemplate={`%s | ${appTitle}`} />
        <Routing />
      </ConfigProvider>
    </HelmetProvider>
  );
};

export default App;
