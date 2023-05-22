import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';

import { resetSettings } from 'store/reducers/SettingsSlice';
import { resetTabsData } from 'store/reducers/TabSlice';
import { resetApiUrl } from 'store/reducers/ApiSlice';
import { useAppDispatch } from 'shared/hooks/redux';
import { graphql } from 'shared/api';
import { INIT_FIRESTORE } from 'shared/lib/firestore/constant';
import { useUpdateFirestore } from 'shared/lib/firestore/hook';

const Clear: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const updateFirestore = useUpdateFirestore();
  const { refetch } = graphql.useGetSchemaQuery('{}');

  const clearDataHandler = async () => {
    dispatch(resetTabsData());
    dispatch(resetSettings());
    dispatch(resetApiUrl());

    await updateFirestore(INIT_FIRESTORE);
    refetch();
  };

  return (
    <Popconfirm
      title={t('modals.settings.clear.button.popup.title')}
      description={t('modals.settings.clear.button.popup.subtitle')}
      onConfirm={clearDataHandler}
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      okText={t('modals.settings.clear.button.popup.confirm')}
      cancelText={t('modals.settings.clear.button.popup.cancel')}
    >
      <Button danger size="large">
        {t('modals.settings.clear.button.text')}
      </Button>
    </Popconfirm>
  );
};

export default Clear;
