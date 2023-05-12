import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { ErrorBoundary } from 'shared/hoc';
import { SandboxLayout } from './layout';

const Sandbox: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('pageTitle.sandbox')}</title>
      </Helmet>
      <ErrorBoundary type="page">
        <SandboxLayout />
      </ErrorBoundary>
    </>
  );
};

export default Sandbox;
