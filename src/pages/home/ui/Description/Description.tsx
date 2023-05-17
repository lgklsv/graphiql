import { Typography, Grid, Space, Image } from 'antd';

import styles from './Description.module.scss';

const { Paragraph } = Typography;
const { useBreakpoint } = Grid;

interface DescriptionProps {
  title?: string;
  text: string;
  imgUrl?: string;
}

const Description: React.FC<DescriptionProps> = ({ title, text, imgUrl }) => {
  const screens = useBreakpoint();
  return (
    <section className={styles.description}>
      <Space direction="vertical" size="large">
        {title && <h2 className={styles.description__title}>{title}</h2>}
        <Paragraph className={styles.description__text}>{text}</Paragraph>
        {imgUrl && <Image width="100%" src={imgUrl} preview={false} />}
      </Space>
    </section>
  );
};

export default Description;
