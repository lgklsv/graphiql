import React from 'react';
import ReactDOM from 'react-dom';

import { Nav } from '../Nav';
import styles from './HamburgerNav.module.scss';

const HamburgerNav: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleHamburgerNav = () => {
    setIsOpen((prev) => !prev);
  };

  return ReactDOM.createPortal(
    <>
      <nav className={styles.navbar_hamburger}>
        <div
          className={`${styles.navbar__list_hamburger} ${
            isOpen ? `${styles.active}` : `${styles.inactive}`
          }`}
        >
          <Nav toggle={toggleHamburgerNav} mobile />
        </div>
        <div
          className={
            isOpen ? `${styles.hamburger} ${styles.active}` : styles.hamburger
          }
          onClick={toggleHamburgerNav}
        >
          <div className={styles.hamburger__line} id={styles.bar1} />
          <div className={styles.hamburger__line} id={styles.bar2} />
          <div className={styles.hamburger__line} id={styles.bar3} />
        </div>
      </nav>
      {isOpen && (
        <div className={styles.outside} onClick={toggleHamburgerNav} />
      )}
    </>,
    document.getElementById('hamburger') as HTMLElement
  );
};

export default HamburgerNav;
