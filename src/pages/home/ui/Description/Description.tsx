import { Col, Row, Typography } from 'antd';
import { useMatchMedia } from 'shared/hooks';
import styles from './Description.module.scss';

const { Paragraph } = Typography;

const Description: React.FC = () => {
  const { isMobile } = useMatchMedia();
  return (
    <section className={styles.description}>
      <Row gutter={[32, 32]}>
        <Col span={isMobile ? 24 : 8}>
          <div className={styles.description__backgroundImage} />
        </Col>
        <Col span={isMobile ? 24 : 16}>
          <div className={styles.description__text}>
            <h2 className={styles.description__title}>
              Your graph&apos;s command center
            </h2>
            <Paragraph className={styles.description__text_full}>
              GraphiQL is end-to-end cloud platform for building, observing, and
              evolving your graph. Validate schema changes, monitor field usage,
              and route queries across any number of your backend services.
            </Paragraph>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default Description;
