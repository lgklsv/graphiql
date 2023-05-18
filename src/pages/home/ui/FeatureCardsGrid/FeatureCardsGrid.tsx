import React from 'react';
import { Space } from 'antd';
import {
  ClearOutlined,
  CodeOutlined,
  FireFilled,
  MacCommandOutlined,
  PlusSquareOutlined,
  RadiusSettingOutlined,
  TranslationOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import FeatureCard from './FeatureCard';
import styles from './FeatureCardsGrid.module.scss';

interface Features {
  icon: React.ReactNode;
  title: string;
  text: string;
}

const FeatureCardsGrid: React.FC = () => {
  const { t } = useTranslation();
  const FEATURES: Features[] = [
    {
      icon: <CodeOutlined />,
      title: t('home.featureGrid.codemirror.title'),
      text: t('home.featureGrid.codemirror.text'),
    },
    {
      icon: <FireFilled />,
      title: t('home.featureGrid.firebase.title'),
      text: t('home.featureGrid.firebase.text'),
    },
    {
      icon: <ClearOutlined />,
      title: t('home.featureGrid.prettify.title'),
      text: t('home.featureGrid.prettify.text'),
    },
    {
      icon: <PlusSquareOutlined />,
      title: t('home.featureGrid.tabs.title'),
      text: t('home.featureGrid.tabs.text'),
    },
    {
      icon: <MacCommandOutlined />,
      title: t('home.featureGrid.shortcuts.title'),
      text: t('home.featureGrid.shortcuts.text'),
    },
    {
      icon: <TranslationOutlined />,
      title: t('home.featureGrid.translation.title'),
      text: t('home.featureGrid.translation.text'),
    },
  ];

  return (
    <section>
      <Space direction="vertical" size={50}>
        <h2 className={styles.title}>
          <RadiusSettingOutlined /> {t('home.featureGrid.title')}
        </h2>
        <div className={styles.grid}>
          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              text={feature.text}
              icon={feature.icon}
            />
          ))}
        </div>
      </Space>
    </section>
  );
};

export default FeatureCardsGrid;
