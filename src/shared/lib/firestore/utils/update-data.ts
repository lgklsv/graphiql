import { stringifyArray } from './parse-data';

export const updateData = (props: IUpdateQuery) => {
  const { tabs, activeTabKey, query, label } = props;
  const activeTab = { ...tabs.find(({ key }) => key === activeTabKey) };

  if (!activeTab) {
    return null;
  }

  activeTab.query = { ...activeTab.query, ...query };

  if (label) {
    activeTab.label = label;
  }

  const updateTabs = tabs.map((t) =>
    t.key === activeTab.key ? activeTab : t
  ) as Tab[];

  const newActiveKey = activeTab.key as string;

  const stringifyTabs = stringifyArray(updateTabs);
  return { newActiveKey, updateTabs, stringifyTabs };
};
