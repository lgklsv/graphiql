import React from 'react';
import { Image, Space, Typography } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

import { TRANSITION } from 'app/config';
import docsScreenshot from './assets/schema.png';
import styles from './FeatureShowcase.module.scss';

const { Paragraph } = Typography;

const FeatureShowcase: React.FC = () => {
  return (
    <section className={styles.showcase}>
      <motion.div
        initial={{ opacity: 0, scale: 0.75, x: -100, y: 100 }}
        whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={TRANSITION}
      >
        <Space direction="vertical">
          <h2 className={styles.showcase__title}>
            <BookOutlined /> Docs and schema
          </h2>
          <Paragraph className={styles.showcase__description}>
            The API documentation board is one of the most exciting features of
            GraphiQl Sandbox. It enables you to preview GraphQL queries, GraphQL
            type details, and a single field of a given schema. You can also use
            search bar to look up for some fields.
          </Paragraph>
        </Space>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.75, x: 100, y: 100 }}
        whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={TRANSITION}
      >
        <Image width="100%" src={docsScreenshot} preview={false} />
      </motion.div>
    </section>
  );
};

export default FeatureShowcase;
