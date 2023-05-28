import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import { TRANSITION } from 'app/config';
import { DEVELOPERS } from 'shared/lib/constants';
import DevCardList from './DevCardList';
import styles from './Developers.module.scss';

const DevSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <motion.section
      className={styles.developers}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={TRANSITION}
    >
      <h2 className={styles.developers__title}>{t('home.developerTitle')}</h2>
      <DevCardList devCardList={DEVELOPERS} />
    </motion.section>
  );
};

export default DevSection;
