import React from 'react';
import { Segmented } from 'antd';

import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { settingsSelector } from 'store/selectors/settingsSelector';
import { SegmentedValue } from 'antd/es/segmented';
import { NumBoolean, setStatsSetting } from 'store/reducers/SettingsSlice';

const Stats: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isStats } = useAppSelector(settingsSelector);
  const [showStatsValue, setShowStatsValue] = React.useState<string | number>(
    isStats
  );

  const selectStatsHandler = (value: SegmentedValue) => {
    const enteredValue = value as NumBoolean;
    setShowStatsValue(enteredValue);
    dispatch(setStatsSetting(enteredValue));
  };

  return (
    <Segmented
      onChange={selectStatsHandler}
      value={showStatsValue}
      options={[
        {
          label: 'On',
          value: 1,
        },
        {
          label: 'Off',
          value: 0,
        },
      ]}
    />
  );
};

export default Stats;
