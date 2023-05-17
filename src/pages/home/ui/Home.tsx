import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import { ErrorBoundary } from 'shared/hoc';
import { BookOutlined } from '@ant-design/icons';
import Intro from './Intro/Intro';
import styles from './Home.module.scss';
import DevSection from './Developers/DevSection';
import Description from './Description/Description';
import Screenshot from './Screenshot/Screenshot';
import FeatureShowcase from './FeatureShowcase/FeatureShowcase';
import docsScreenshot from './assets/schema.png';
import headersScreenshot from './assets/headers.png';

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
          <FeatureShowcase
            title="Docs and schema"
            icon={<BookOutlined />}
            text="The API documentation board is one of the most exciting features of
            GraphiQl Sandbox. It enables you to preview GraphQL queries, GraphQL
            type details, and a single field of a given schema. You can also use
            search bar to look up for some fields."
            imgUrl={docsScreenshot}
          />
          <FeatureShowcase
            reverse
            title="Send HTTP headers"
            icon="{ } "
            text="GraphiQL Sandbox allows you to send requests with HTTP headers, such as a token needed to authenticate a user or some other kind of authorization. Make sure to first switch the tab to “Headers,” and then add your headers as a JSON object. By the way, you can add more than one field."
            imgUrl={headersScreenshot}
          />
          <DevSection />
        </motion.div>
      </ErrorBoundary>
    </>
  );
};

export default Home;
