import { Col, Row, Typography, Grid } from 'antd';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import { TRANSITION } from 'app/config';
import styles from './Description.module.scss';

const { Paragraph } = Typography;
const { useBreakpoint } = Grid;

const Description: React.FC = () => {
  const { t } = useTranslation();
  const screens = useBreakpoint();
  return (
    <section className={styles.description}>
      {/* <Row gutter={[32, 32]}>
        <Col span={screens.xs ? 24 : 8}>
          <motion.div
            initial={{ opacity: 0, scale: 0.75, x: -100, y: 100 }}
            whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            transition={TRANSITION}
            className={styles.description__backgroundImage}
          />
        </Col>

        <Col span={screens.xs ? 24 : 16}>
          <motion.div
            initial={{ opacity: 0, scale: 0.75, x: 100, y: 100 }}
            whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            transition={TRANSITION}
            className={styles.description__text}
          >
            <h2 className={styles.description__title}>
              {t('home.descriptionTitle')}
            </h2>
            <Paragraph className={styles.description__text_full}>
              {t('home.descriptionText')}
            </Paragraph>
          </motion.div>
        </Col>
      </Row> */}
    </section>
  );
};

export default Description;
