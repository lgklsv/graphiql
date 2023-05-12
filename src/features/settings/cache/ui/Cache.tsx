import React from 'react';
import { Segmented } from 'antd';
import { SegmentedValue } from 'antd/es/segmented';

import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { NumBoolean, setCacheSetting } from 'store/reducers/SettingsSlice';
import { settingsSelector } from 'store/selectors/settingsSelector';

const Cache: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isCache } = useAppSelector(settingsSelector);
  const [cacheValue, setCacheValue] = React.useState<string | number>(isCache);

  const selectCacheHandler = (value: SegmentedValue) => {
    const enteredValue = value as NumBoolean;
    setCacheValue(enteredValue);
    dispatch(setCacheSetting(enteredValue));
  };

  return (
    <Segmented
      onChange={selectCacheHandler}
      value={cacheValue}
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

export default Cache;
