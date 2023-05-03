import { DEVELOPERS } from 'shared/lib/constants';
import styles from './Developers.module.scss';
import DevCardList from './DevCardList';

const DevSection: React.FC = () => {
  return (
    <section className={styles.developers}>
      <h2 className={styles.developers__title}>Developers</h2>
      <DevCardList devCardList={DEVELOPERS} />
    </section>
  );
};

export default DevSection;
