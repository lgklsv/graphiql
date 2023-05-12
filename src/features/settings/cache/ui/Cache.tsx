import React from 'react';
import { Segmented } from 'antd';

const Cache: React.FC = () => {
  return (
    <Segmented
      options={[
        {
          label: 'On',
          value: 'cache',
        },
        {
          label: 'Off',
          value: 'noCache',
        },
      ]}
    />
  );
};

export default Cache;
