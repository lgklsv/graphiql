import React from 'react';
import { Tabs } from 'antd';

import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/hooks/redux';
import { useTabs } from 'shared/hooks/use-tab';
import { setActiveTabKey, updateTabs } from 'store/reducers/TabSlice';

import styles from './SessionTabs.module.scss';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const SessionTabs: React.FC = () => {
  const { t } = useTranslation();
  const newTabIndex = React.useRef(0);
  const dispatch = useAppDispatch();
  const { tabs: items, activeTabKey: activeKey } = useTabs();

  const onChange = (newActiveKey: string) => {
    dispatch(setActiveTabKey(newActiveKey));
  };

  const updateTabsStore = (newActiveKey: string, tabs: Tab[]) => {
    dispatch(setActiveTabKey(newActiveKey));
    dispatch(updateTabs(tabs));
  };

  const add = () => {
    const newActiveKey = `newTab${(newTabIndex.current += 1)}`;
    const newPanes = [...items].map((pane) => {
      return { ...pane, closable: true }; // I changed it here to assure immutability to prevent error while changing the item prop.
    });
    newPanes.push({
      label: t('sandbox.newTab'),
      children: '',
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
      newPanes[0] = { ...newPanes[0], closable: false }; // I changed it here to assure immutability to prevent error while changing the item prop.
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
