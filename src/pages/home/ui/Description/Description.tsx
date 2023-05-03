import { Col, Row, Typography, Grid } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './Description.module.scss';

const { Paragraph } = Typography;
const { useBreakpoint } = Grid;

const Description: React.FC = () => {
  const { t } = useTranslation();
  const screens = useBreakpoint();
  return (
    <section className={styles.description}>
      <Row gutter={[32, 32]}>
        <Col span={screens.xs ? 24 : 8}>
          <div className={styles.description__backgroundImage} />
        </Col>
        <Col span={screens.xs ? 24 : 16}>
          <div className={styles.description__text}>
            <h2 className={styles.description__title}>
              {t('home.descriptionTitle')}
            </h2>
            <Paragraph className={styles.description__text_full}>
              {t('home.descriptionText')}
            </Paragraph>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default Description;
