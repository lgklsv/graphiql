interface IUpdateQuery {
  tabs: Tab[];
  activeTabKey: string;
  query: TabQueryContent;
}

interface IUpdateLabel {
  label: string;
  tabs: Tab[];
  activeTabKey: string;
}

// interface IUseUpdateQuery extends IUpdateQuery {}
