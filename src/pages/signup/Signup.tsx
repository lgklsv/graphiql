import React from 'react';
import { Helmet } from 'react-helmet-async';
import { TitleForm } from 'shared/ui';
import { ROUTES } from 'pages/config';
import { Form } from 'features/sign-up-form';
import style from './Signup.module.scss';

const Signup: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      <div className={style.signup_container}>
        <TitleForm
          title="Let's get started"
          link={ROUTES.login}
          text="Have an account? "
          textLink=" Sign in"
        />

        <Form.SignUp />
      </div>
    </>
  );
};

export default Signup;
