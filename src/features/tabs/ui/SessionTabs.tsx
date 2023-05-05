import React from 'react';
import { Tabs } from 'antd';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { docsSelector } from 'store/selectors/DocsSelectors';
import styles from './SessionTabs.module.scss';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

// Demo tabs, but we can prepare only one for the user
const initialItems = [
  { label: 'Tab 1', children: 'Content of Tab 1', key: '1', closable: true },
  { label: 'Tab 2', children: 'Content of Tab 2', key: '2', closable: true },
  { label: 'Tab 3', children: 'Content of Tab 3', key: '3', closable: true },
];

const SessionTabs: React.FC = () => {
  const { t } = useTranslation();
  const { isDocs } = useSelector(docsSelector);
  const [activeKey, setActiveKey] = React.useState(initialItems[0].key);
  const [items, setItems] = React.useState(initialItems);
  const newTabIndex = React.useRef(0);

  // We need to store the active tab and all the tabs in redux slice
  // How to get active tab object
  // console.log(items.find((item) => item.key === activeKey));

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const add = () => {
    const newActiveKey = `newTab${(newTabIndex.current += 1)}`;
    const newPanes = items.map((pane) => {
      pane.closable = true;
      return pane;
    });
    newPanes.push({
      label: t('sandbox.newTab'),
      children: '',
      key: newActiveKey,
      closable: true,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
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
      newPanes[0].closable = false;
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <div className={`${styles.tabs} ${isDocs ? styles.tabs_docs : ''}`}>
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
