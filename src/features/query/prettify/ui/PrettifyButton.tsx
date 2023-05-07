import React from 'react';
import { parse, print } from 'graphql';
import { ClearOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

import { useTabs } from 'shared/hooks/use-tab';
import { useAppDispatch } from 'shared/hooks/redux';
import { updateTabContent } from 'store/reducers/TabSlice';

const PrettifyButton: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { activeTabKey, tabQuery } = useTabs();

  const prettifyQueryHandler = () => {
    if (tabQuery.data) {
      // Prettify query
      try {
        const prettifiedQuery = print(parse(tabQuery.data));
        dispatch(
          updateTabContent({ activeTabKey, query: { data: prettifiedQuery } })
        );
      } catch (err) {
        // Parsing error, skip formatting
      }
      // TODO: Prettify variables
      // TODO: Prettify headers
    }
  };

  return (
    <Tooltip placement="bottomLeft" title={t('sandbox.tooltips.prettify')}>
      <Button
        onClick={prettifyQueryHandler}
        type="text"
        size="large"
        icon={<ClearOutlined />}
      />
    </Tooltip>
  );
};

export default PrettifyButton;
