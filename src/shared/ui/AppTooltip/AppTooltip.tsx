import React from 'react';
import { Tooltip } from 'antd';

interface AppTooltipProps {
  children: React.ReactNode;
  title: string;
}

const AppTooltip: React.FC<AppTooltipProps> = ({ children, title }) => {
  return (
    <Tooltip placement="bottomLeft" mouseLeaveDelay={0} title={title}>
      {children}
    </Tooltip>
  );
};

export default AppTooltip;
