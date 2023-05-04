import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Divider } from 'antd';
<<<<<<< HEAD
<<<<<<< HEAD
import { GithubOutlined, GoogleOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
=======
import { GithubOutlined } from '@ant-design/icons';
>>>>>>> f577065 (feat: add message loading & error for auth)
=======
>>>>>>> ad96307 (feat: add auth for git & change login page)
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
<<<<<<< HEAD
          <ButtonForm
            text={t('button.signGithub')}
            icon={<GithubOutlined />}
            className={style.git_btn}
          />

=======
          <ButtonAuth.Git />
>>>>>>> ad96307 (feat: add auth for git & change login page)
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
