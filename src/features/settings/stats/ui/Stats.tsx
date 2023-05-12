import React from 'react';
import { Segmented } from 'antd';

const Stats: React.FC = () => {
  return (
    <Segmented
      options={[
        {
          label: 'On',
          value: 'stats',
        },
        {
          label: 'Off',
          value: 'noStats',
        },
      ]}
    />
  );
};

export default Stats;
