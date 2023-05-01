import { Button, Space } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from 'pages/config';
import styles from './Nav.module.scss';

type NavProps = {
  mobile: boolean;
};

const Nav: React.FC<NavProps> = ({ mobile }) => {
  const navigate = useNavigate();

  return (
    <Space
      size={15}
      direction={mobile ? 'vertical' : 'horizontal'}
      className={mobile ? '' : styles.nav}
    >
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
  );
};

export default Nav;
