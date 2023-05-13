import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { Header } from 'widgets/header';
import { Footer } from 'widgets/footer';
import { Spinner } from 'shared/ui';

import styles from './Layout.module.scss';

const { Content } = Layout;

const LayoutPage: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Content className={styles.main}>
        <Suspense fallback={<Spinner size="large" />}>
          <Outlet />
        </Suspense>
      </Content>
      <Footer />
    </Layout>
  );
};

export default LayoutPage;
