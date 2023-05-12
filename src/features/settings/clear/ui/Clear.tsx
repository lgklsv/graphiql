import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';

const Clear: React.FC = () => {
  const clearDataHandler = () => {
    console.log('cleared');
  };

  return (
    <Popconfirm
      title="Clear locally stored data?"
      description="Are you sure to remove the data? Action cannot be undone."
      onConfirm={clearDataHandler}
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      okText="Yes"
      cancelText="No"
    >
      <Button danger size="large">
        Clear data
      </Button>
    </Popconfirm>
  );
};

export default Clear;
