import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Space, Typography } from 'antd';

import { string } from 'shared/lib';
import DocsText from '../docs-text/DocsText';
import styles from './ParseSchemaData.module.scss';

const { Text } = Typography;

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

  if (!argumentTypes && name && name.description) {
    return (
      <div>
        {name.description && (
          <Text
            style={{ color: '#6F7A8F', fontSize: '1rem' }}
            type="secondary"
            className={styles.description}
          >
            <ReactMarkdown>{string.capitalize(name.description)}</ReactMarkdown>
          </Text>
        )}
      </div>
    );
  }

  return (
    <Space size={0} style={{ flexWrap: 'wrap' }}>
      <DocsText>{name?.title}:</DocsText>
      {/* argument */}
      {argumentTypes && (
        <Space size={0} style={{ flexWrap: 'wrap' }}>
          <DocsText>(</DocsText>

          {argumentTypes.map((item) => (
            <Space size={2} key={item.name}>
              <DocsText>{item.name}:</DocsText>

              <DocsText active onClick={onPropClick}>
                {item.type}
              </DocsText>

              {item.default && (
                <DocsText> = {JSON.stringify(item.default)}</DocsText>
              )}
            </Space>
          ))}

          <DocsText>)</DocsText>
        </Space>
      )}
      <DocsText active onClick={onPropClick}>
        {returnTypes}
      </DocsText>
    </Space>
  );
};
