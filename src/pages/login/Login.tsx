import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Typography, Divider } from 'antd';
import { GithubOutlined, GoogleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ROUTES } from 'pages/config';
import { ButtonForm } from 'shared/ui/Button/Button';
import { Form } from 'features/login-form';
import style from './Login.module.scss';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Log In</title>
      </Helmet>

      <div className={style.login_container}>
        <Title>
          Sign in
          <Text className={style.signup_link}>
            New to GraphiQL? <Link to={ROUTES.signup}> Lets get started.</Link>
          </Text>
        </Title>

        <div className={style.login_buttons}>
          {/* TODO: stay? */}
          <ButtonForm
            text="Sign in with GitHub"
            icon={<GithubOutlined />}
            className={style.git_btn}
          />
          <ButtonForm
            text="Sign in with Google"
            icon={<GoogleOutlined />}
            className={style.google_btn}
          />
        </div>

        <Divider plain className={style.separator}>
          or
        </Divider>

        <Form.Login />
      </div>
    </>
  );
};

export default Login;
