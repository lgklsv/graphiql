import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';

import { useAppDispatch } from 'shared/hooks/redux';
import { resetSettings } from 'store/reducers/SettingsSlice';
import { resetTabsData } from 'store/reducers/TabSlice';

const Clear: React.FC = () => {
  const dispatch = useAppDispatch();

  const clearDataHandler = async () => {
    dispatch(resetTabsData());
    dispatch(resetSettings());
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
