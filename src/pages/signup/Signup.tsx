import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { TitleForm } from 'shared/ui';
import { ROUTES } from 'pages/config';
import { Form } from 'features/sign-up-form';
import style from './Signup.module.scss';

const Signup: React.FC = () => {
  const { t } = useTranslation();
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
