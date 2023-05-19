import { stringifyArray } from './parse-data';

interface UpdateQuery {
  tabs: Tab[];
  activeTabKey: string;
  query: TabQueryContent;
}

interface UpdateLabel {
  tabs: Tab[];
  activeTabKey: string;
  label: string;
}

export const updateData = (props: UpdateQuery) => {
  const { tabs, activeTabKey, query } = props;
  const activeTab = { ...tabs.find(({ key }) => key === activeTabKey) };

  if (!activeTab) {
    return null;
  }

  activeTab.query = { ...activeTab.query, ...query };

  const updateTabs = tabs.map((t) =>
    t.key === activeTab.key ? activeTab : t
  ) as Tab[];

  const newActiveKey = activeTab.key as string;

  const stringifyTabs = stringifyArray(updateTabs);
  return { newActiveKey, updateTabs, stringifyTabs };
};

export const updateDataLabel = (props: UpdateLabel) => {
  const { tabs, activeTabKey, label } = props;
  const activeTab = { ...tabs.find(({ key }) => key === activeTabKey) };

  if (!activeTab) {
    return null;
  }

  activeTab.label = label;
  const updateTabs = stringifyArray(
    tabs.map((t) => (t.key === activeTab.key ? activeTab : t)) as Tab[]
  );

  return updateTabs;
};
