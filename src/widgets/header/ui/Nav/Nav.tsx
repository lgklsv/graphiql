import { Button, Space } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { LangSwitcher } from 'features/langSwitcher';
import { ROUTES } from 'pages/config';
import styles from './Nav.module.scss';

interface NavProps {
  mobile: boolean;
  toggle?: () => void;
}

const Nav: React.FC<NavProps> = ({ mobile, toggle }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const buttonClickHandler = (route: string) => {
    navigate(route);
    if (mobile && toggle) {
      toggle();
    }
  };

  return (
    <Space
      size={15}
      direction={mobile ? 'vertical' : 'horizontal'}
      className={mobile ? '' : styles.nav}
    >
      <Button
        className={styles.nav__btn}
        size="large"
        onClick={() => buttonClickHandler(ROUTES.signup)}
      >
        {t('button.signup')}
      </Button>
      <Button
        className={styles.nav__btn}
        type="primary"
        size="large"
        onClick={() => buttonClickHandler(ROUTES.login)}
      >
        {t('button.login')}
      </Button>
      <LangSwitcher />
    </Space>
  );
};

export default Nav;
