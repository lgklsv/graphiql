import React from 'react';
import { Space, Typography } from 'antd';

import DocsText from '../docs-text/DocsText';
import TypeDescription from '../type-description/TypeDescription';

const { Title } = Typography;

interface EnumTypeProps {
  info: ParseSchemaData;
  onPropClick?: (e: React.MouseEvent<HTMLElement>) => void;
  // this function must be broadcast to types, separately from extra characters, so that the function works further
}

const EnumType: React.FC<EnumTypeProps> = ({ info, onPropClick }) => {
  const { name, return: returnTypes, type } = info;
  return (
    <Space direction="vertical" size={10}>
      <Space direction="vertical" size={0}>
        <Space size={0} style={{ flexWrap: 'wrap' }}>
          <DocsText noTabIndex>{name?.title}:</DocsText>
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

      <Space direction="vertical" size={0}>
        <Title level={4} style={{ margin: 0 }}>
          Values
        </Title>
        {type && type.enum && (
          <Space size={0} direction="vertical">
            {type.enum.map((item) => (
              <DocsText key={item.key} noTabIndex>
                {item.key}
              </DocsText>
            ))}
          </Space>
        )}
      </Space>
    </Space>
  );
};

export default EnumType;
