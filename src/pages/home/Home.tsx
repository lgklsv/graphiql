import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from 'pages/config';

const { Title, Text } = Typography;

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
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
      <div className="test-block">
        <div className="test-block-second" />
      </div>
      <div className="test-block">
        <div className="test-block-second" />
      </div>

      <ul>
        <li>
          <Link to={ROUTES.login}>
            <Button type="link">Login</Button>
          </Link>
        </li>
        <li>
          <Link to={ROUTES.signup}>
            <Button type="link">Signup</Button>
          </Link>
        </li>
        <li>
          <Link to={ROUTES.sandbox}>
            <Button type="link">Sandbox</Button>
          </Link>
        </li>
        <li>
          <Link to={ROUTES.notFound}>
            <Button type="link">404</Button>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Home;
