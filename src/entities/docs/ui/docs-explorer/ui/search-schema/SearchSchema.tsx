import React from 'react';
import { useTranslation } from 'react-i18next';
import { AutoComplete, Input, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { searchResult } from './utils/search-result';
import style from './SearchSchema.module.scss';

const { Text } = Typography;

interface SearchSchemaProps {
  definitions: IJson;
  onClick: (e: string) => void;
}

export const SearchSchema: React.FC<SearchSchemaProps> = ({
  definitions,
  onClick,
}) => {
  const { t } = useTranslation();
  const [options, setOptions] = React.useState<{ value: string }[]>([]);
  const [valueAutoComplete, setValue] = React.useState('');
  const [isOpen, setOpenDropDown] = React.useState(false);

  const handleSearch = (value: string) => {
    setOpenDropDown(true);
    setValue(value);
    setOptions(value ? searchResult(value, definitions as IJson) : []);
  };

  const handleOnBlur = () => {
    setOpenDropDown(false);
  };

  const handleOnSelect = (value: string) => {
    onClick(value);
    handleOnBlur();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ((e.target as HTMLInputElement).value === '') {
      setValue('');
      setOpenDropDown(false);
    }
  };

  return (
    <div className={style.search}>
      <AutoComplete
        value={valueAutoComplete}
        dropdownMatchSelectWidth={252}
        style={{ width: '100%' }}
        options={options}
        onSelect={handleOnSelect}
        onSearch={handleSearch}
        notFoundContent={<Text>{t('docs.search.notFound')}</Text>}
        onBlur={handleOnBlur}
        open={isOpen}
      >
        <Input
          suffix={<SearchOutlined />}
          placeholder="Search  ⌘ + K"
          allowClear
          size="large"
          onChange={handleInputChange}
        />
      </AutoComplete>
    </div>
  );
};
