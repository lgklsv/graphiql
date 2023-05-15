import React from 'react';
import { useTranslation } from 'react-i18next';
import { AutoComplete, Grid, Input, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import style from './SearchSchema.module.scss';
import { searchResult } from './utils/search-result';

const { Text } = Typography;
const { useBreakpoint } = Grid;

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
  const [isChangeWidth, setWidth] = React.useState(false);
  const [isOpen, setOpenDropDown] = React.useState(false);
  const screens = useBreakpoint();

  const isMobile = (screens.sm || screens.xs) && !screens.md;

  const handleSearch = (value: string) => {
    setOpenDropDown(true);
    setValue(value);
    setOptions(value ? searchResult(value, definitions as IJson) : []);
  };

  const handleOnBlur = () => {
    setWidth(false);
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
        style={{ width: isMobile || isChangeWidth ? '100%' : '25%' }}
        options={options}
        onSelect={handleOnSelect}
        onSearch={handleSearch}
        notFoundContent={<Text>{t('docs.search.notFound')}</Text>}
        onClick={() => {
          setWidth(true);
        }}
        onBlur={handleOnBlur}
        open={isOpen}
      >
        <Input
          suffix={<SearchOutlined />}
          placeholder="⌘ K"
          allowClear
          onChange={handleInputChange}
        />
      </AutoComplete>
    </div>
  );
};
