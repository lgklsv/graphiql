import React from 'react';
import { Typography } from 'antd';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

import { string } from 'shared/lib';
import styles from './TypeDescription.module.scss';

const { Text } = Typography;

interface TypeDescriptionProps {
  description: string | undefined;
}

const TypeDescription: React.FC<TypeDescriptionProps> = ({ description }) => {
  return (
    <div>
      {description && (
        <Text
          style={{ color: '#6F7A8F', fontSize: '1rem' }}
          type="secondary"
          className={styles.description}
        >
          <ReactMarkdown>{string.capitalize(description)}</ReactMarkdown>
        </Text>
      )}
    </div>
  );
};

export default TypeDescription;
