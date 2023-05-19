import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Space, Grid } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useTranslation, Trans } from 'react-i18next';
import { motion } from 'framer-motion';

import { ROUTES } from 'pages/config';
import styles from './Intro.module.scss';

const { useBreakpoint } = Grid;

const Intro: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const screens = useBreakpoint();

  return (
    <section className={styles.intro}>
      <div className={styles.intro__text}>
        <h1 className={styles.intro__heading}>
          <Trans i18nKey="home.introTitle">
            <span className={styles.intro__heading_gradient}>GraphQL</span>{' '}
          </Trans>
        </h1>
        <p className={styles.intro__text_full}>{t('home.introText')}</p>
      </div>
      <Space size={screens.xs ? 25 : 40}>
        <Button
          style={{ borderColor: 'white', color: 'white', scale: '1.1' }}
          size={screens.xs ? 'middle' : 'large'}
          type="primary"
          href="https://github.com/lgklsv/graphiql"
        >
          {t('button.docs')}
        </Button>
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        >
          <Button
            style={{ borderColor: 'white', scale: '1.1' }}
            size={screens.xs ? 'middle' : 'large'}
            onClick={() => navigate(ROUTES.sandbox)}
          >
            {t('button.start')}
            <RightOutlined />
          </Button>
        </motion.div>
      </Space>
    </section>
  );
};

export default Intro;
