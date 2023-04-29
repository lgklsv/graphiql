import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { Header } from 'widgets/header';
import { Footer } from 'widgets/footer';

const { Content } = Layout;

const LayoutPage: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
};

export default LayoutPage;
