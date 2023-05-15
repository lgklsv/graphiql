import React from 'react';
import { Space } from 'antd';

import DocsText from '../docs-text/DocsText';
import TypeDescription from '../type-description/TypeDescription';
import EnumType from '../enum-type/EnumType';

interface ParseSchemaDataProps {
  info: ParseSchemaData;
  onPropClick?: (e: React.MouseEvent<HTMLElement>) => void;
  // this function must be broadcast to types, separately from extra characters, so that the function works further
}

export const ParseSchemaData: React.FC<ParseSchemaDataProps> = ({
  info,
  onPropClick,
}) => {
  const { name, arguments: argumentTypes, return: returnTypes } = info;

  if (name && name.title === 'enum') {
    return <EnumType info={info} onPropClick={onPropClick} />;
  }

  if (name && name.description && name.title === 'scalar') {
    return <TypeDescription description={name.description} />;
  }

  return (
    <Space direction="vertical" size={0}>
      <Space size={0} style={{ flexWrap: 'wrap' }}>
        <DocsText noTabIndex>{name?.title}:</DocsText>
        {/* argument */}
        {argumentTypes && (
          <Space size={0} style={{ flexWrap: 'wrap' }}>
            <DocsText noTabIndex>(</DocsText>

            {argumentTypes.map((item) => (
              <Space size={2} key={item.name}>
                <DocsText noTabIndex>{item.name}:</DocsText>

                <DocsText active onClick={onPropClick}>
                  {item.type}
                </DocsText>

                {item.default && (
                  <DocsText noTabIndex>
                    {' '}
                    = {JSON.stringify(item.default)}
                  </DocsText>
                )}
              </Space>
            ))}

            <DocsText noTabIndex>)</DocsText>
          </Space>
        )}
        <DocsText active onClick={onPropClick}>
          {typeof returnTypes === 'object' && returnTypes !== null
            ? returnTypes.type
            : returnTypes}
        </DocsText>
      </Space>
      {name && name.description && (
        <TypeDescription description={name.description} />
      )}
    </Space>
  );
};
