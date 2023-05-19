import { stringifyArray } from './parse-data';

interface Update {
  tabs: Tab[];
  activeTabKey: string;
  query: TabQueryContent;
}

export const updateData = (props: Update) => {
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
