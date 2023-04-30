import React from 'react';
import { Helmet } from 'react-helmet';
import { Form, Input, Typography } from 'antd';
import {
  LockOutlined,
  MailOutlined,
  GithubOutlined,
  GoogleOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ROUTES } from 'pages/config';
import './Login.scss';
import { ButtonForm } from './ui/Button';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Log In</title>
      </Helmet>

      <div className="login-container">
        <Title>
          Sign in
          <Text className="signup-link">
            New to GraphiQL? <Link to={ROUTES.signup}> Lets get started.</Link>
          </Text>
        </Title>

        <div className="login-buttons">
          <ButtonForm
            text="Sign in with GitHub"
            icon={<GithubOutlined />}
            className="git-button"
          />
          <ButtonForm
            text="Sign in with Google"
            icon={<GoogleOutlined />}
            className="google-button"
          />
        </div>

        <div className="separator">
          <hr />
          <span>or</span>
          <hr />
        </div>

        <div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your Email!' }]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email Address"
                size="large"
                type="email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <ButtonForm text="Log in" />
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
