import { Button, Space } from 'antd';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ROUTES } from 'pages/config';
import { removeUser } from 'store/reducers/UserSlice';
import { LangSwitcher } from 'features/langSwitcher';
import { useAuthState } from 'shared/hooks/use-auth';
import { useAppDispatch } from 'shared/hooks/redux';
import styles from './Nav.module.scss';

interface NavProps {
  mobile: boolean;
  toggle?: () => void;
}

const Nav: React.FC<NavProps> = ({ mobile, toggle }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth } = useAuthState();
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(removeUser());
    navigate(ROUTES.home, { replace: true });
  };

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
      {isAuth && location.pathname !== ROUTES.home && (
        <Button
          size="large"
          onClick={() => buttonClickHandler(ROUTES.home)}
          className={styles.nav__btn}
        >
          {t('button.home')}
        </Button>
      )}
      {isAuth && location.pathname === ROUTES.home && (
        <Button
          size="large"
          onClick={() => buttonClickHandler(ROUTES.sandbox)}
          className={styles.nav__btn}
        >
          {t('button.sandbox')}
        </Button>
      )}
      <LangSwitcher />
      {isAuth ? (
        <Button type="primary" size="large" onClick={handleLogOut}>
          {t('button.logout')}
        </Button>
      ) : (
        <>
          <Button
            size="large"
            onClick={() => buttonClickHandler(ROUTES.signup)}
            className={styles.nav__btn}
          >
            {t('button.signup')}
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={() => buttonClickHandler(ROUTES.login)}
            className={styles.nav__btn}
          >
            {t('button.login')}
          </Button>
        </>
      )}
    </Space>
  );
};

export default Nav;
