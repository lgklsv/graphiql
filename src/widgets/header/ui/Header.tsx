import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';

import { ROUTES } from 'pages/config';
import { HamburgerNav } from './HamburgerNav';
import { Nav } from './Nav';
import styles from './Header.module.scss';

const HeaderComponent: React.FC = () => {
  const { scrollY } = useScroll();
  const [isScroll, setIsScroll] = React.useState(false);

  React.useEffect(() => {
    return scrollY.on('change', (latest) =>
      latest > 80 ? setIsScroll(true) : setIsScroll(false)
    );
  }, [scrollY]);

  return (
    <motion.header
      style={{
        backgroundColor: isScroll ? 'rgba(250 250 250 / 0.5)' : 'white',
      }}
      className={styles.header}
    >
      <div className={styles['header-container']}>
        <Link to={ROUTES.home} className={styles.logo} />
        <Nav mobile={false} />
        <HamburgerNav />
      </div>
    </motion.header>
  );
};

export default HeaderComponent;
