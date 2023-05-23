import React from 'react';
import { parse, print } from 'graphql';
import { CheckOutlined, ClearOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHotkeys } from 'react-hotkeys-hook';

import { SHORTCUTS } from 'app/config';
import { useTabs } from 'shared/hooks/use-tab';
import { AppTooltip } from 'shared/ui';
import { useUpdateFirestore, useUpdateTabs } from 'shared/lib/firestore/hook';

const PrettifyButton: React.FC = () => {
  const { t } = useTranslation();
  const [isPrettified, setIsPrettified] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const { activeTabKey, tabQuery, tabs } = useTabs();
  const updateTabsForFirebase = useUpdateTabs();
  const updateFirestore = useUpdateFirestore();

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

  const prettifyQueryHandler = async () => {
    if (tabQuery.data) {
      // Prettify query
      try {
        const prettifiedQuery = print(parse(tabQuery.data));

        const updatedData = updateTabsForFirebase({
          tabs,
          activeTabKey,
          query: { data: prettifiedQuery },
        });
        setIsPrettified(true);

        if (updatedData) {
          await updateFirestore(updatedData);
        }
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

        const updatedData = updateTabsForFirebase({
          tabs,
          activeTabKey,
          query: { variables: prettifiedVariables },
        });

        if (updatedData) {
          await updateFirestore(updatedData);
        }
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

        const updatedData = updateTabsForFirebase({
          tabs,
          activeTabKey,
          query: { headers: prettifiedHeaders },
        });

        if (updatedData) {
          await updateFirestore(updatedData);
        }
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
