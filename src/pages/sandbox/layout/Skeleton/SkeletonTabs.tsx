import React from 'react';
import { Grid, Space } from 'antd';
import { SkeletonComponent } from 'shared/ui';
import SANDBOX_SKELETON_STYLE from './commonSkeletonStyle';

const styleTab = {
  ...SANDBOX_SKELETON_STYLE,
  borderRadius: 8,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  marginBottom: 8,
};

const { useBreakpoint } = Grid;

const SkeletonTabs: React.FC = () => {
  const screens = useBreakpoint();
  const isMobile = (screens.sm || screens.xs) && !screens.md;

  return (
    <Space size={2}>
      <SkeletonComponent
        styleTitleProps={{
          ...styleTab,
          width: `${isMobile ? '100px' : '136px'}`,
        }}
      />
      <SkeletonComponent
        styleTitleProps={{
          ...styleTab,
          width: `${isMobile ? '100px' : '136px'}`,
        }}
      />
      <SkeletonComponent
        styleTitleProps={{
          ...styleTab,
          width: 40,
        }}
      />
    </Space>
  );
};

export default SkeletonTabs;
