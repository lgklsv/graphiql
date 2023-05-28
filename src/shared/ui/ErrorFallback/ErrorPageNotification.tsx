import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Button } from 'antd';

import styles from './ErrorFallback.module.scss';

interface ErrorPageNotificationProps {
  errorMsg: string | null;
  onReset?: () => void;
}
const ErrorPageNotification: React.FC<ErrorPageNotificationProps> = ({
  errorMsg,
  onReset,
}: ErrorPageNotificationProps) => {
  const { t } = useTranslation();
  const location = useLocation();

  const reloadPage = () => window.location.reload();

  return (
    <>
      <Helmet>
        <title>{t('pageTitle.error')}</title>
      </Helmet>
      <div className={styles['not-found']}>
        <div className={styles['not-found__wrapper']}>
          <h3>{t('errorBoundary.errorTitle')}</h3>
          <h4>{errorMsg || t('errorBoundary.defaultMsg')}</h4>
          <Button
            type="link"
            href={location.pathname}
            onClick={(event) => {
              event?.preventDefault();
              reloadPage();
            }}
          >
            {t('errorBoundary.errorReload')}
          </Button>
          {onReset && (
            <Button type="primary" onClick={onReset}>
              {' '}
              {t('errorBoundary.errorReset')}
            </Button>
          )}
        </div>
        <span className={styles.ground} />
      </div>
    </>
  );
};

export default ErrorPageNotification;
