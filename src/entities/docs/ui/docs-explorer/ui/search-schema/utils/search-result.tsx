import { Typography } from 'antd';

export const searchResult = (query: string, schema: IJson) => {
  const array = Object.keys(schema.definitions).filter((item) => {
    return item.toLowerCase().includes(query.toLowerCase());
  });

  return array.map((name) => {
    return {
      value: name,
      label: <Typography.Text>{name}</Typography.Text>,
    };
  });
};
