/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Tabs } from 'antd';
import { setActiveTabKey, updateTabs } from 'store/reducers/TabSlice';
import { updateFirestoreData } from 'shared/lib/firestore/rest-firestore';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';
import { useAppDispatch } from 'shared/hooks/redux';
import { useTabs } from 'shared/hooks/use-tab';
import { useAuthState } from 'shared/hooks/use-auth';
import { stringifyArray } from 'shared/lib/firestore/utils';

import styles from './SessionTabs.module.scss';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const SessionTabs: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { tabs: items, activeTabKey: activeKey } = useTabs();
  const { id } = useAuthState();

  const onChange = async (newActiveKey: string) => {
    dispatch(setActiveTabKey(newActiveKey));
    await updateFirestoreData(id as string, { activeKey: newActiveKey });
  };

  const updateTabsStore = async (newActiveKey: string, tabs: Tab[]) => {
    dispatch(setActiveTabKey(newActiveKey));
    dispatch(updateTabs(tabs));

    await updateFirestoreData(id as string, {
      activeKey: newActiveKey,
      tabs: stringifyArray(tabs),
    });
  };

  const add = () => {
    const newActiveKey = uuid();
    const newPanes = [...items].map((pane) => {
      return { ...pane, closable: true };
    });
    newPanes.push({
      label: t('sandbox.newTab'),
      query: { data: '', variables: '', headers: '' },
      response: { data: '', isLoading: false, error: undefined },
      key: newActiveKey,
      closable: true,
    });
    updateTabsStore(newActiveKey, newPanes);
  };

  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    if (newPanes.length === 1) {
      newPanes[0] = { ...newPanes[0], closable: false };
    }
    updateTabsStore(newActiveKey, newPanes);
  };

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <div className={styles.tabs}>
      <Tabs
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        items={items}
      />
    </div>
  );
};

export default SessionTabs;
