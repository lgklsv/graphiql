type Tab = {
  label: string;
  content: TabQueryContent;
  key: string;
  closable: boolean;
};

type TabQueryContent = {
  query?: string;
  variables?: string;
  headers?: string;
};
