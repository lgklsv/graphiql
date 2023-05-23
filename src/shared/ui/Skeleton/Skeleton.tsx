import React from 'react';
import { Skeleton } from 'antd';

interface SkeletonProps {
  styleTitleProps: { [key: string]: string | number };
  style?: { [key: string]: string | number };
}
const SkeletonComponent: React.FC<SkeletonProps> = ({
  styleTitleProps,
  style,
}: SkeletonProps) => {
  return (
    <Skeleton
      active
      title={{ style: styleTitleProps }}
      paragraph={false}
      style={style}
    />
  );
};

export default SkeletonComponent;
