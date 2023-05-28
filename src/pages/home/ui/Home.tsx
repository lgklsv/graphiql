import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import { ErrorBoundary } from 'shared/hoc';
import { BookOutlined, RadarChartOutlined } from '@ant-design/icons';
import Intro from './Intro/Intro';
import styles from './Home.module.scss';
import DevSection from './Developers/DevSection';
import Description from './Description/Description';
import FeatureShowcase from './FeatureShowcase/FeatureShowcase';

import schemaImgPlaceholder from './assets/placeholders/blurred-schema.png';
import headersImgPlaceholder from './assets/placeholders/blurred-headers.png';
import appImgPlaceholder from './assets/placeholders/blurred-app.png';
import queryImgPlaceholder from './assets/placeholders/blurred-query.png';
import schemaImg from './assets/schema.png';
import headersImg from './assets/headers.png';
import queryImg from './assets/query.png';
import appImg from './assets/app.png';
import StackList from './StackList/StackList';
import CardsGrid from './FeatureCardsGrid/FeatureCardsGrid';

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
          <Description
            text={t('home.descriptionGoal')}
            imgUrl={appImg}
            imgPlaceholder={appImgPlaceholder}
            imgAlt="GraphiQL IDE screenshot"
          />
          <Description text={t('home.descriptionText')} />
          <FeatureShowcase
            reverse
            title={t('home.featureShowcase.query.title')}
            icon={<RadarChartOutlined />}
            text={t('home.featureShowcase.query.text')}
            imgUrl={queryImg}
            imgPlaceholder={queryImgPlaceholder}
          />
          <FeatureShowcase
            title={t('home.featureShowcase.docs.title')}
            icon={<BookOutlined />}
            text={t('home.featureShowcase.docs.text')}
            imgUrl={schemaImg}
            imgPlaceholder={schemaImgPlaceholder}
          />
          <FeatureShowcase
            reverse
            title={t('home.featureShowcase.headers.title')}
            icon="{ } "
            text={t('home.featureShowcase.headers.text')}
            imgUrl={headersImg}
            imgPlaceholder={headersImgPlaceholder}
          />
          <CardsGrid />
          <StackList />
          <DevSection />
        </motion.div>
      </ErrorBoundary>
    </>
  );
};

export default Home;
