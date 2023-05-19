import React from 'react';
import { Typography, Space, Image } from 'antd';

import styles from './Description.module.scss';

const { Paragraph } = Typography;

interface DescriptionProps {
  title?: string;
  text: string;
  imgUrl?: string;
  imgPlaceholder?: string;
  imgAlt?: string;
}

const Description: React.FC<DescriptionProps> = ({
  title,
  text,
  imgUrl,
  imgPlaceholder,
  imgAlt,
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
            alt={imgAlt}
            placeholder={
              <Image
                width="100%"
                preview={false}
                src={imgPlaceholder}
                alt={imgAlt}
              />
            }
          />
        )}
      </Space>
    </section>
  );
};

export default Description;
