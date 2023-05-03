import { useTranslation } from 'react-i18next';
import { DEVELOPERS } from 'shared/lib/constants';
import DevCardList from './DevCardList';
import styles from './Developers.module.scss';

const DevSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className={styles.developers}>
      <h2 className={styles.developers__title}>{t('home.developerTitle')}</h2>
      <DevCardList devCardList={DEVELOPERS} />
    </section>
  );
};

export default DevSection;
