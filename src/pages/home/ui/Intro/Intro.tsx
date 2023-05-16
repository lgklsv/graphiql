import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Space, Grid } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { useTranslation, Trans } from 'react-i18next';
import { motion } from 'framer-motion';

import { ROUTES } from 'pages/config';
import { EASING } from 'app/config';
import styles from './Intro.module.scss';

// TODO: add isAuthorized check and adjust redirect buttons: If authorized redirect to sandbox, of not => SignUP

const { useBreakpoint } = Grid;

const Intro: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const screens = useBreakpoint();

  return (
    <motion.section
      className={styles.intro}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ ease: EASING }}
    >
      <div className={styles.intro__text}>
        <h1 className={styles.intro__heading}>
          <Trans i18nKey="home.introTitle">
            <span className={styles.intro__heading_gradient}>GraphQL</span>{' '}
          </Trans>
        </h1>
        <p className={styles.intro__text_full}>{t('home.introText')}</p>
      </div>
      <Space size={screens.xs ? 'middle' : 'large'}>
        <Button
          style={{ borderColor: 'white', color: 'white' }}
          size={screens.xs ? 'middle' : 'large'}
          type="primary"
          href="https://github.com/lgklsv/graphiql"
        >
          {t('button.docs')}
        </Button>
        <Button
          style={{ borderColor: 'white' }}
          size={screens.xs ? 'middle' : 'large'}
          onClick={() => navigate(ROUTES.sandbox)}
        >
          {t('button.start')}
          <RightOutlined />
        </Button>
      </Space>
    </motion.section>
  );
};

export default Intro;
