import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { ROUTES } from 'pages/config';
import { Form } from 'features/login-form';
import { ButtonAuth } from 'features/login-buttons';
import { TitleForm } from 'shared/ui';
import { useAuthState } from 'shared/hooks/use-auth';
import { Navigate, useLocation } from 'react-router-dom';
import style from './Login.module.scss';

const Login: React.FC = () => {
<<<<<<< HEAD
  const { t } = useTranslation();
=======
  const { isAuth } = useAuthState();
  const location = useLocation();

  if (isAuth) {
    return <Navigate to={ROUTES.home} state={{ from: location }} />;
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
