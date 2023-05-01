import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography } from 'antd';
import { GithubOutlined, GoogleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ROUTES } from 'pages/config';
import './Login.scss';
import { ButtonForm } from 'shared/ui/Button/Button';
import { Form } from 'features/login-form';

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
          <Form.Login />
        </div>
      </div>
    </>
  );
};

export default Login;
