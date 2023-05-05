import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { ROUTES } from 'pages/config';
import { Form } from 'features/sign-up-form';
import { TitleForm } from 'shared/ui';

import { useAuthState } from 'shared/hooks/use-auth';
import { Navigate, useLocation } from 'react-router-dom';
import style from './Signup.module.scss';

const Signup: React.FC = () => {
  const { t } = useTranslation();

  const { isAuth } = useAuthState();
  const location = useLocation();

  if (isAuth) {
    return <Navigate to={ROUTES.sandbox} state={{ from: location }} />;
  }

  return (
    <>
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      <div className={style.signup_container}>
        <TitleForm
          title={t('signUp.title')}
          link={ROUTES.login}
          text={t('signUp.loginRedirect')}
          textLink={t('signUp.redirectLink')}
        />
        <Form.SignUp />
      </div>
    </>
  );
};

export default Signup;
