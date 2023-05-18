import React from 'react';
import { Space } from 'antd';
import { RadiusSettingOutlined, TranslationOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

import { EASING, TRANSITION } from 'app/config';
import styles from './FeatureCardsGrid.module.scss';
import FeatureCard from './FeatureCard';

interface Features {
  icon: React.ReactNode;
  title: string;
  text: string;
}

const FEATURES: Features[] = [
  {
    icon: <TranslationOutlined />,
    title: 'Two languages support',
    text: 'IDE and the whole service is translated in russian and english',
  },
  {
    icon: <TranslationOutlined />,
    title: 'Two languages support',
    text: 'IDE and the whole service is translated in russian and english',
  },
  {
    icon: <TranslationOutlined />,
    title: 'Two languages support',
    text: 'IDE and the whole service is translated in russian and english',
  },
  {
    icon: <TranslationOutlined />,
    title: 'Two languages support',
    text: 'IDE and the whole service is translated in russian and english',
  },
  {
    icon: <TranslationOutlined />,
    title: 'Two languages support',
    text: 'IDE and the whole service is translated in russian and english',
  },
  {
    icon: <TranslationOutlined />,
    title: 'Two languages support',
    text: 'IDE and the whole service is translated in russian and english',
  },
];

const FeatureCardsGrid: React.FC = () => {
  return (
    <section>
      <Space direction="vertical" size={50}>
        <h2 className={styles.title}>
          <RadiusSettingOutlined /> More features
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
