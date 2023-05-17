import React from 'react';
import { Image, Space, Typography } from 'antd';
import { motion } from 'framer-motion';

import { TRANSITION } from 'app/config';

import styles from './FeatureShowcase.module.scss';

const { Paragraph } = Typography;

const positionRight = { opacity: 0, scale: 0.75, x: 100, y: 100 };
const positionLeft = { opacity: 0, scale: 0.75, x: -100, y: 100 };

interface FeatureShowcaseProps {
  reverse?: boolean;
  title: string;
  icon?: React.ReactNode;
  text: string;
  imgUrl: string;
}

const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({
  reverse,
  title,
  icon,
  text,
  imgUrl,
}) => {
  return (
    <section
      className={`${styles.showcase} ${reverse ? styles.showcase_reverse : ''}`}
    >
      <motion.div
        initial={reverse ? positionRight : positionLeft}
        whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={TRANSITION}
        className={styles.showcase__item}
      >
        <Space direction="vertical">
          <h2 className={styles.showcase__title}>
            {icon}
            {title}
          </h2>
          <Paragraph className={styles.showcase__description}>{text}</Paragraph>
        </Space>
      </motion.div>
      <motion.div
        initial={reverse ? positionLeft : positionRight}
        whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={TRANSITION}
        className={styles.showcase__item}
      >
        <Image width="100%" src={imgUrl} preview={false} />
      </motion.div>
    </section>
  );
};

export default FeatureShowcase;
