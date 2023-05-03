import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Divider } from 'antd';
<<<<<<< HEAD
import { GithubOutlined, GoogleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
=======
import { GithubOutlined } from '@ant-design/icons';
>>>>>>> f577065 (feat: add message loading & error for auth)
import { ROUTES } from 'pages/config';
import { Form } from 'features/login-form';
import { ButtonForm, TitleForm } from 'shared/ui';
import { ButtonAuth } from 'features/login-google';

import style from './Login.module.scss';

const Login: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>Log In</title>
      </Helmet>

      <div className={style.login_container}>
        <TitleForm
          title={t('logIn.title')}
          link={ROUTES.signup}
          text={t('logIn.signUpRedirect')}
          textLink={t('logIn.redirectLink')}
        />

        <div className={style.login_buttons}>
          <ButtonForm
            text={t('button.signGithub')}
            icon={<GithubOutlined />}
            className={style.git_btn}
          />

          <ButtonAuth.Google />
        </div>

        <Divider plain className={style.separator}>
          {t('logIn.or')}
        </Divider>

        <Form.Login />
      </div>
    </>
  );
};

export default Login;
