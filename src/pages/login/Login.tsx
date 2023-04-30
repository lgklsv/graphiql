import React from 'react';
import { Helmet } from 'react-helmet';
import { Button, Form, Input, Typography } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ROUTES } from 'pages/config';
import './Login.scss';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Log In</title>
      </Helmet>

      <div className="login-container">
        <Title>Sign in</Title>
        <Text>
          New to GraphiQL? <Link to={ROUTES.signup}> Lets get started.</Link>
        </Text>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            {/* <a className="login-form-forgot" href="">
              Forgot password
            </a> */}
          </Form.Item>

          <Form.Item shouldUpdate>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Login;
