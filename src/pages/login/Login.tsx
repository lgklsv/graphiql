import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { ROUTES } from 'pages/config';
import { Form } from 'features/login-form';
import { ButtonAuth } from 'features/login-google';
import { TitleForm } from 'shared/ui';

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
          <ButtonAuth.Git />
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
