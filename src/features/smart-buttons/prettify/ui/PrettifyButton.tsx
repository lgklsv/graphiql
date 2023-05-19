import React from 'react';
import { parse, print } from 'graphql';
import { CheckOutlined, ClearOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHotkeys } from 'react-hotkeys-hook';

import { SHORTCUTS } from 'app/config';
import { useTabs } from 'shared/hooks/use-tab';
import { useAppDispatch } from 'shared/hooks/redux';
import { updateTabContent } from 'store/reducers/TabSlice';
import { AppTooltip } from 'shared/ui';

const PrettifyButton: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isPrettified, setIsPrettified] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const { activeTabKey, tabQuery } = useTabs();

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPrettified || isError) {
      timer = setTimeout(() => {
        setIsPrettified(false);
        setIsError(false);
      }, 800);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isPrettified, isError]);

  const prettifyQueryHandler = () => {
    if (tabQuery.data) {
      // Prettify query
      try {
        const prettifiedQuery = print(parse(tabQuery.data));
        dispatch(
          updateTabContent({ activeTabKey, query: { data: prettifiedQuery } })
        );
        setIsPrettified(true);
      } catch (err) {
        // Parsing error, skip formatting
        setIsError(true);
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

  useHotkeys(SHORTCUTS.prettify, prettifyQueryHandler);

  let title = t('sandbox.tooltips.prettify.default');
  if (isPrettified) title = t('sandbox.tooltips.prettify.done');
  if (isError) title = t('sandbox.tooltips.prettify.error');

  return (
    <AppTooltip title={title}>
      <Button
        style={isError ? { backgroundColor: '#FFECE8' } : undefined}
        onClick={prettifyQueryHandler}
        type="text"
        size="large"
        icon={isPrettified ? <CheckOutlined /> : <ClearOutlined />}
      />
    </AppTooltip>
  );
};

export default PrettifyButton;