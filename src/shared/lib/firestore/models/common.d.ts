interface IUpdateQuery {
  tabs: Tab[];
  activeTabKey: string;
  query: TabQueryContent;
  label?: string;
}

interface IFirestoreData {
  id?: string;
  isCache: number | NumBoolean;
  isStats: number | NumBoolean;
  activeKey: string;
  tabs: string[] | Tab[];
  url: string;
}
