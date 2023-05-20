import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSetFirestore } from 'shared/lib/firestore/hook/use-set-firestore';
import { useAuthState } from 'shared/hooks/use-auth';
import { ErrorBoundary } from 'shared/hoc';
import { SandboxLayout } from './layout';

const Sandbox: React.FC = () => {
  const { t } = useTranslation();
  const firestoreDispatch = useSetFirestore();
  const { id } = useAuthState();

  React.useEffect(() => {
    firestoreDispatch(id as string);
  }, []);

  // TODO: add loader on respons firestore

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
