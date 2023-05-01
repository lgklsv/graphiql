import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Space } from 'antd';
import { motion, useScroll } from 'framer-motion';

import { ROUTES } from 'pages/config';
import styles from './Header.module.scss';

const HeaderComponent: React.FC = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    return scrollY.on('change', (latest) =>
      latest > 80 ? setIsActive(true) : setIsActive(false)
    );
  }, [scrollY]);

  return (
    <motion.header
      style={{
        backgroundColor: isActive ? 'rgba(250 250 250 / 0.5)' : 'white',
      }}
      className={styles.header}
    >
      <div className={styles['header-container']}>
        <Link to={ROUTES.home} className={styles.logo} />
        <Space size={15}>
          <Button size="large" onClick={() => navigate(ROUTES.signup)}>
            Sign Up
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate(ROUTES.login)}
          >
            Log In
          </Button>
        </Space>
      </div>
    </motion.header>
  );
};

export default HeaderComponent;
