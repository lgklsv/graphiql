import React from 'react';
import { Card, Space, Typography } from 'antd';
import { motion } from 'framer-motion';

import { TRANSITION } from 'app/config';
import styles from './FeatureCardsGrid.module.scss';

const { Paragraph } = Typography;

interface FeatureCardProps {
  title: string;
  text: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, icon, text }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={TRANSITION}
    >
      <Card
        className={styles.card}
        key={title}
        title={
          <Space
            direction="vertical"
            style={{
              width: '100%',
              minHeight: '100px',
              alignItems: 'center',
              paddingTop: '1rem',
            }}
          >
            <div className={styles.card__icon}>{icon}</div>
            <h3 className={styles.card__title}>{title}</h3>
          </Space>
        }
        bordered
      >
        <Paragraph className={styles.card__text}>{text}</Paragraph>
      </Card>
    </motion.div>
  );
};

export default FeatureCard;
