import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { Navigate, useLocation } from 'react-router-dom';
import { GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { googleProvider, gitProvider } from 'firebase';

import { SButton } from 'features/smart-buttons';
import { ROUTES } from 'pages/config';
import { Form } from 'features/login-form';
import { TitleForm } from 'shared/ui';
import { useAuthState } from 'shared/hooks/use-auth';

import { ErrorBoundary } from 'shared/hoc';
import styles from './Login.module.scss';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const { isAuth } = useAuthState();
  const location = useLocation();

  if (isAuth) {
    return <Navigate to={ROUTES.sandbox} state={{ from: location }} />;
  }

  return (
    <>
      <Helmet>
        <title>{t('pageTitle.login')}</title>
      </Helmet>
      <ErrorBoundary type="page">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.login}
        >
          <div className={styles.login__container}>
            <TitleForm
              title={t('logIn.title')}
              link={ROUTES.signup}
              text={t('logIn.signUpRedirect')}
              textLink={t('logIn.redirectLink')}
            />
            <div className={styles.login__buttons}>
              <SButton.FirebaseAuth
                text={t('button.signGithub')}
                provider={gitProvider}
                icon={<GithubOutlined />}
                className={styles.git_btn}
              />
              <SButton.FirebaseAuth
                text={t('button.signGoogle')}
                provider={googleProvider}
                icon={<GoogleOutlined />}
                className={styles.google_btn}
              />
            </div>

            <Divider plain className={styles.separator}>
              {t('logIn.or')}
            </Divider>
            <Form.Login />
          </div>
        </motion.div>
      </ErrorBoundary>
    </>
  );
};

export default Login;
