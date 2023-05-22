import React from 'react';
import { Skeleton } from 'antd';

interface SkeletonProps {
  isLoading: boolean;
  children: React.ReactNode;
  className: string;
}
const SkeletonComponent: React.FC<SkeletonProps> = ({
  isLoading,
  children,
  className,
}: SkeletonProps) => {
  return (
    <Skeleton
      loading={isLoading}
      active
      title={{ style: { height: 32, opacity: 0.2 } }}
      paragraph={false}
      className={className}
    >
      {children}
    </Skeleton>
  );
};

export default SkeletonComponent;
