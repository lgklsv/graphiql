import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useDataFromFirestore } from 'shared/lib/firestore/hook';
import { useAuthState } from 'shared/hooks/use-auth';
import { ErrorBoundary } from 'shared/hoc';
import { SandboxLayout } from './layout';

const Sandbox: React.FC = () => {
  const { t } = useTranslation();
  const firestoreDispatch = useDataFromFirestore();
  const { id } = useAuthState();
  const [isLoading, setLoading] = React.useState(false);
  // TODO: check state loading data from firestore

  React.useEffect(() => {
    firestoreDispatch(id as string, setLoading);
  }, []);
  // TODO: add loader on respons firestore, delay in updating url and tabs

  return (
    <>
      <Helmet>
        <title>{t('pageTitle.sandbox')}</title>
      </Helmet>
      <ErrorBoundary type="page">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <SandboxLayout />
        </motion.div>
      </ErrorBoundary>
    </>
  );
};

export default Sandbox;
