import React from 'react';
import { Helmet } from 'react-helmet';
import { Button, Layout, Space, Typography } from 'antd';
import { Footer } from 'widgets/footer';
import HeaderComponent from 'widgets/header/ui/Header';

const { Title, Text } = Typography;

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Layout>
        <HeaderComponent />
        <Space direction="vertical">
          <Title level={1}>Home Page / Welcome Page</Title>
          <Title level={2}>Hello world!</Title>
          <Title level={3}>Title Primary</Title>
          <Space>
            <Text>Text default</Text>
            <Text type="secondary">Text secondary</Text>
            <Button type="primary" size="large">
              Test btn
            </Button>
          </Space>
        </Space>

        <div className="test-block">
          <div className="test-block-second" />
        </div>

        <ul>
          <li>
            <Typography.Link href="/login">Login</Typography.Link>
          </li>
          <li>
            <Typography.Link href="/signup">Signup</Typography.Link>
          </li>
          <li>
            <Typography.Link href="/sandbox">Sandbox</Typography.Link>
          </li>
          <li>
            <Typography.Link href="/wiuehrfieohf">404</Typography.Link>
          </li>
        </ul>
        <Footer />
      </Layout>
    </>
  );
};

export default Home;
