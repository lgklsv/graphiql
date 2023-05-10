import React from 'react';
import { parse, print } from 'graphql';
import { ClearOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { useTabs } from 'shared/hooks/use-tab';
import { useAppDispatch } from 'shared/hooks/redux';
import { updateTabContent } from 'store/reducers/TabSlice';
import { AppTooltip } from 'shared/ui';

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
    }
    // Prettify variables
    if (tabQuery.variables) {
      try {
        const prettifiedVariables = JSON.stringify(
          JSON.parse(tabQuery.variables),
          null,
          2
        );
        dispatch(
          updateTabContent({
            activeTabKey,
            query: { variables: prettifiedVariables },
          })
        );
      } catch (err) {
        // Parsing error, skip formatting
      }
    }
    // Prettify headers
    if (tabQuery.headers) {
      try {
        const prettifiedHeaders = JSON.stringify(
          JSON.parse(tabQuery.headers),
          null,
          2
        );
        dispatch(
          updateTabContent({
            activeTabKey,
            query: { headers: prettifiedHeaders },
          })
        );
      } catch (err) {
        // Parsing error, skip formatting
      }
    }
  };

  return (
    <AppTooltip title={t('sandbox.tooltips.prettify')}>
      <Button
        onClick={prettifyQueryHandler}
        type="text"
        size="large"
        icon={<ClearOutlined />}
      />
    </AppTooltip>
  );
};

export default PrettifyButton;
