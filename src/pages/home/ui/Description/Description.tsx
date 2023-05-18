import React from 'react';
import { Typography, Space, Image } from 'antd';

import styles from './Description.module.scss';

const { Paragraph } = Typography;

interface DescriptionProps {
  title?: string;
  text: string;
  imgUrl?: string;
  imgPlaceholder?: string;
}

const Description: React.FC<DescriptionProps> = ({
  title,
  text,
  imgUrl,
  imgPlaceholder,
}) => {
  return (
    <section className={styles.description}>
      <Space direction="vertical" size="large">
        {title && <h2 className={styles.description__title}>{title}</h2>}
        <Paragraph className={styles.description__text}>{text}</Paragraph>
        {imgUrl && (
          <Image
            width="100%"
            src={imgUrl}
            preview={false}
            placeholder={
              <Image width="100%" preview={false} src={imgPlaceholder} />
            }
          />
        )}
      </Space>
    </section>
  );
};

export default Description;
