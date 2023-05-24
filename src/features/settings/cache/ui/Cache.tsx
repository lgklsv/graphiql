import React from 'react';
import { Segmented } from 'antd';
import { SegmentedValue } from 'antd/es/segmented';
import { useTranslation } from 'react-i18next';

import { NumBoolean, setCacheSetting } from 'store/reducers/SettingsSlice';
import { settingsSelector } from 'store/selectors/settingsSelector';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { triggerFirestoreUpdate } from 'store/reducers/FirestoreSlice';

const Cache: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isCache } = useAppSelector(settingsSelector);

  const selectCacheHandler = async (value: SegmentedValue) => {
    const enteredValue = value as NumBoolean;
    dispatch(setCacheSetting(enteredValue));
    dispatch(triggerFirestoreUpdate());
  };

  return (
    <Segmented
      onChange={selectCacheHandler}
      value={isCache}
      options={[
        {
          label: t('modals.settings.cache.toggler.on'),
          value: 1,
        },
        {
          label: t('modals.settings.cache.toggler.off'),
          value: 0,
        },
      ]}
    />
  );
};

export default Cache;
