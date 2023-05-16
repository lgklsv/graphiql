import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import { ErrorBoundary } from 'shared/hoc';
import Intro from './Intro/Intro';
import styles from './Home.module.scss';
import DevSection from './Developers/DevSection';
import Description from './Description/Description';
import Screenshot from './Screenshot/Screenshot';
import FeatureShowcase from './FeatureShowcase/FeatureShowcase';

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('pageTitle.home')}</title>
      </Helmet>
      <ErrorBoundary type="page">
        <motion.div
          className={styles.content}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Intro />
          <Screenshot />
          <Description />
          <FeatureShowcase />
          <DevSection />
        </motion.div>
      </ErrorBoundary>
    </>
  );
};

export default Home;
