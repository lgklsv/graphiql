import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { Header } from 'widgets/header';
import { Footer } from 'widgets/footer';

import styles from './Layout.module.scss';

const { Content } = Layout;

const LayoutPage: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Content className={styles.main}>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
};

export default LayoutPage;
