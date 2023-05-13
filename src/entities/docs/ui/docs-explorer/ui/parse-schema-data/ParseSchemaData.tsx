import React from 'react';
import styles from './ParseSchemaData.module.scss';

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
      <div>
        <span className={styles.doc__root_type}>{name?.title}</span> :
        {/* argument */}
        {argumentTypes && `(`}
        {argumentTypes &&
          argumentTypes.map((item) => (
            <React.Fragment key={item.name}>
              <p className={styles.doc__arg_name}>{item.name}:</p>
              <p className={styles.doc__arg_type} onClick={onClick}>
                {item.type}
              </p>
            </React.Fragment>
          ))}
        {argumentTypes && `)`}
        <p onClick={onClick} className={styles.doc__type_name}>
          {returnTypes}
        </p>
      </div>
      <h4>
        {name?.description && (
          <span className={styles.doc__root_type}>{name?.description}</span>
        )}
      </h4>
    </>
  );
};
