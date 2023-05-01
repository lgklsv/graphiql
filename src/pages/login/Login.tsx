import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Divider } from 'antd';
import { GithubOutlined, GoogleOutlined } from '@ant-design/icons';
import { ROUTES } from 'pages/config';
import { Form } from 'features/login-form';
import { ButtonForm, TitleForm } from 'shared/ui';

import style from './Login.module.scss';

const Login: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Log In</title>
      </Helmet>

      <div className={style.login_container}>
        <TitleForm
          title="Sign in"
          link={ROUTES.signup}
          text="New to GraphiQL? "
          textLink="Lets get started."
        />

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
