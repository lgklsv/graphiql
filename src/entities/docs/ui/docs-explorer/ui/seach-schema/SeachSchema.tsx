import React, { useState } from 'react';
import { AutoComplete, Input } from 'antd';
import type { SelectProps } from 'antd/es/select';

const searchResult = (query: string, def: IJson) => {
  const array = Object.keys(def).filter((item) => {
    return item.toLowerCase().includes(query.toLowerCase());
  });

  return array.map((name) => {
    return {
      value: name,
      label: (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>
            Found {query} on <p>{name}</p>
          </span>
        </div>
      ),
    };
  });
};

interface SearchSchemaProps {
  definitions: IJson;
  onClick: (e: string) => void;
}

export const SearchSchema: React.FC<SearchSchemaProps> = ({
  definitions,
  onClick,
}) => {
  const [options, setOptions] = useState<SelectProps<object>['options']>([]);

  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value, definitions as IJson) : []);
  };

  const onSelect = (value: string) => {
    onClick(value);
  };

  return (
    <div className="style.search">
      <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{ width: 300 }}
        options={options}
        onSelect={onSelect}
        onSearch={handleSearch}
        notFoundContent="не найдено"
      >
        <Input.Search placeholder="⌘ K" allowClear />
      </AutoComplete>
    </div>
  );
};
