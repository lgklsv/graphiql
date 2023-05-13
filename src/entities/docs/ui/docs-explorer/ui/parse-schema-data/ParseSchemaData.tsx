import React from 'react';
import { Button, Space, Typography } from 'antd';
import styles from './ParseSchemaData.module.scss';

const { Text, Title } = Typography;

interface ParseSchemaDataProps {
  info: ParseSchemaData;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  // this function must be broadcast to types, separately from extra characters, so that the function works further
}

export const ParseSchemaData: React.FC<ParseSchemaDataProps> = ({
  info,
  onClick,
}) => {
  const { name, arguments: argumentTypes, return: returnTypes } = info;

  return (
    <>
      <Space size={5}>
        <Button
          type="link"
          size="large"
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            paddingRight: 0,
            cursor: 'auto',
            height: 'auto',
          }}
        >
          {name?.title}:
        </Button>
        {/* argument */}
        {argumentTypes && (
          <Space size={3}>
            (
            {argumentTypes.map((item) => (
              <React.Fragment key={item.name}>
                <p className={styles.doc__arg_name}>{item.name}:</p>
                <p className={styles.doc__arg_type} onClick={onClick}>
                  {item.type}
                </p>
              </React.Fragment>
            ))}
            )
          </Space>
        )}

        <Text onClick={onClick} className={styles.doc__type_name}>
          {returnTypes}
        </Text>
      </Space>
      <h4>
        {name?.description && (
          <span className={styles.doc__root_type}>{name?.description}</span>
        )}
      </h4>
    </>
  );
};
