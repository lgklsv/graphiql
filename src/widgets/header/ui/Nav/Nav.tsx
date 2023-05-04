import { Button, Space } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ROUTES } from 'pages/config';
import LangSwitcher from 'features/langSwitcher/LangSwitcher';
import styles from './Nav.module.scss';

type NavProps = {
  mobile: boolean;
};

const Nav: React.FC<NavProps> = ({ mobile }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Space
      size={15}
      direction={mobile ? 'vertical' : 'horizontal'}
      className={mobile ? '' : styles.nav}
    >
      <Button size="large" onClick={() => navigate(ROUTES.signup)}>
        {t('button.signup')}
      </Button>
      <Button
        type="primary"
        size="large"
        onClick={() => navigate(ROUTES.login)}
      >
        {t('button.login')}
      </Button>
      <LangSwitcher />
    </Space>
  );
};

export default Nav;
