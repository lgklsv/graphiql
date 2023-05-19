import React from 'react';
import { Segmented } from 'antd';
import { SegmentedValue } from 'antd/es/segmented';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { settingsSelector } from 'store/selectors/settingsSelector';
import { NumBoolean, setStatsSetting } from 'store/reducers/SettingsSlice';
import { useAuthState } from 'shared/hooks/use-auth';
import { updateFirestoreData } from 'shared/lib/firestore/constants';

const Stats: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isStats } = useAppSelector(settingsSelector);
  const { id } = useAuthState();

  const selectStatsHandler = async (value: SegmentedValue) => {
    const enteredValue = value as NumBoolean;
    dispatch(setStatsSetting(enteredValue));
    await updateFirestoreData(id as string, { isStats: value });
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
