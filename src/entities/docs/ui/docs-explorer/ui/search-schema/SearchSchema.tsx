import React from 'react';
import { useTranslation } from 'react-i18next';
import { AutoComplete, Input, InputRef, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { useHotkeys } from 'react-hotkeys-hook';
import { SHORTCUTS } from 'app/config';
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
  const searchInputRef = React.useRef<InputRef>(null);

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

  const focusOnSearchHandler = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  useHotkeys(SHORTCUTS.search, focusOnSearchHandler);

  return (
    <div className={style.search}>
      <AutoComplete
        value={valueAutoComplete}
        dropdownMatchSelectWidth={252}
        style={{ width: '100%' }}
        options={options}
        onSelect={handleOnSelect}
        onSearch={handleSearch}
        notFoundContent={
          <Text style={{ padding: '0.5rem' }}>{t('docs.search.notFound')}</Text>
        }
        onBlur={handleOnBlur}
        open={isOpen}
      >
        <Input
          ref={searchInputRef}
          suffix={<SearchOutlined />}
          placeholder={t('docs.search.placeholder') || 'Search  ⌘ + K'}
          allowClear
          size="large"
          onChange={handleInputChange}
        />
      </AutoComplete>
    </div>
  );
};
