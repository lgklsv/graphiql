import React from 'react';
import { Space } from 'antd';
import { SkeletonComponent } from 'shared/ui';
import styles from './Skeleton.module.scss';
import SANDBOX_SKELETON_STYLE from './commonSkeletonStyle';

const styleInput = {
  ...SANDBOX_SKELETON_STYLE,
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
};

const styleBtn = {
  ...SANDBOX_SKELETON_STYLE,
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  borderLeft: 'none',
};

const SkeletonApiConnector: React.FC = () => {
  return (
    <Space.Compact className={styles.skeleton_api}>
      <SkeletonComponent styleTitleProps={styleInput} />
      <SkeletonComponent style={{ width: 42 }} styleTitleProps={styleBtn} />
    </Space.Compact>
  );
};

export default SkeletonApiConnector;
