import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';

import { ROUTES } from 'pages/config';
import { EASING } from 'app/config';
import { HamburgerNav } from './HamburgerNav';
import { Nav } from './Nav';
import styles from './Header.module.scss';

const HeaderComponent: React.FC = () => {
  const { scrollY } = useScroll();
  const [isScroll, setIsScroll] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    return scrollY.on('change', (latest) =>
      latest > 80 ? setIsScroll(true) : setIsScroll(false)
    );
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: location.pathname === '/sandbox' ? 0 : 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.3,
        ease: EASING,
      }}
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
