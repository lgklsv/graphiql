import React from 'react';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './DocsHeader.module.scss';

const { Title } = Typography;

const DocsHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.header}>
      <Title>{t('docs.header.title')}</Title>
    </div>
  );
};

export default DocsHeader;
