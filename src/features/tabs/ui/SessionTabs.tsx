/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Tabs } from 'antd';
import {
  useSensor,
  PointerSensor,
  DragEndEvent,
  DndContext,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';

import { setActiveTabKey, updateTabs } from 'store/reducers/TabSlice';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { useTabs } from 'shared/hooks/use-tab';
import { triggerFirestoreUpdate } from 'store/reducers/FirestoreSlice';
import { firestoreSelector } from 'store/selectors/firestoreSelector';
import DraggableTabNode from './DraggableTabs';
import styles from './SessionTabs.module.scss';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const SessionTabs: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userDataLoading } = useAppSelector(firestoreSelector);
  const { t, i18n } = useTranslation();
  const { tabs: items, activeTabKey: activeKey } = useTabs();
  const [className, setClassName] = React.useState('');

  const onChange = async (newActiveKey: string) => {
    dispatch(setActiveTabKey(newActiveKey));
    dispatch(triggerFirestoreUpdate());
  };

  const updateTabsStore = async (newActiveKey: string, tabs: Tab[]) => {
    dispatch(setActiveTabKey(newActiveKey));
    dispatch(updateTabs(tabs));

    dispatch(triggerFirestoreUpdate());
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

  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const activeIndex = items.findIndex((i) => i.key === active.id);
      const overIndex = items.findIndex((i) => i.key === over?.id);
      const newTabItems = arrayMove(items, activeIndex, overIndex);
      const activeTabKeyEnd = newTabItems[overIndex]?.key || newTabItems[0].key;
      updateTabsStore(activeTabKeyEnd, newTabItems);
    }
  };

  return (
    <div
      className={`${styles.tabs} ${
        i18n.language === 'ru' || userDataLoading ? styles.tabs_narrow : ''
      }`}
    >
      <Tabs
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        items={items}
        className={className}
        renderTabBar={(tabBarProps, DefaultTabBar) => (
          <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
            <SortableContext
              items={items.map((i) => i.key)}
              strategy={horizontalListSortingStrategy}
            >
              <DefaultTabBar {...tabBarProps} mobile={false}>
                {(node) => (
                  <DraggableTabNode
                    {...node.props}
                    key={node.key}
                    onActiveBarTransform={setClassName}
                  >
                    {node}
                  </DraggableTabNode>
                )}
              </DefaultTabBar>
            </SortableContext>
          </DndContext>
        )}
      />
    </div>
  );
};

export default SessionTabs;
