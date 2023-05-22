import React from 'react';
import { Segmented } from 'antd';
import { SegmentedValue } from 'antd/es/segmented';
import { useTranslation } from 'react-i18next';

import { settingsSelector } from 'store/selectors/settingsSelector';
import { NumBoolean, setStatsSetting } from 'store/reducers/SettingsSlice';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { useUpdateFirestore } from 'shared/lib/firestore/hook';

const Stats: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const updateFirestore = useUpdateFirestore();
  const { isStats } = useAppSelector(settingsSelector);

  const selectStatsHandler = async (value: SegmentedValue) => {
    const enteredValue = value as NumBoolean;
    dispatch(setStatsSetting(enteredValue));
    await updateFirestore({ isStats: value });
  };

  return (
    <Segmented
      onChange={selectStatsHandler}
      value={isStats}
      options={[
        {
          label: t('modals.settings.stats.toggler.on'),
          value: 1,
        },
        {
          label: t('modals.settings.stats.toggler.off'),
          value: 0,
        },
      ]}
    />
  );
};

export default Stats;
