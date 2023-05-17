import React from 'react';
import { Space } from 'antd';
import { motion } from 'framer-motion';

import { TRANSITION } from 'app/config';
import styles from './StackList.module.scss';

const TECH_STACK = ['typescript', 'react', 'firebase', 'graphql'];

const StackList: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={TRANSITION}
      className={styles.stackList}
    >
      <Space direction="vertical" size={40}>
        {TECH_STACK.map((item) => (
          <h2 key={item} className={styles.stackList__item}>
            {item}
          </h2>
        ))}
      </Space>
    </motion.section>
  );
};

export default StackList;
