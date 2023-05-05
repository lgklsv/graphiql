import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { ROUTES } from 'pages/config';
import { Form } from 'features/login-form';
import { FirebaseAuth } from 'features/firebase-button-auth';
import { TitleForm } from 'shared/ui';
import { useAuthState } from 'shared/hooks/use-auth';
import { Navigate, useLocation } from 'react-router-dom';
import { GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import { googleProvider, gitProvider } from 'firebase';
import style from './Login.module.scss';

const Login: React.FC = () => {
<<<<<<< HEAD
  const { t } = useTranslation();
=======
  const { isAuth } = useAuthState();
  const location = useLocation();

  if (isAuth) {
    return <Navigate to={ROUTES.sandbox} state={{ from: location }} />;
  }

>>>>>>> 51261a3 (refactor: change name folders & refactor code)
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
          <FirebaseAuth.Button
            text="Sign in with GitHub"
            provider={gitProvider}
            icon={<GithubOutlined />}
            className={style.git_btn}
          />

          <FirebaseAuth.Button
            text="Sign in with Google"
            provider={googleProvider}
            icon={<GoogleOutlined />}
            className={style.google_btn}
          />
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
