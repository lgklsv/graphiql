import { Button, Space } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LangSwitcher } from 'features/langSwitcher';
import { useAuth } from 'shared/hooks/use-auth';
import { ROUTES } from 'pages/config';
import { removeUser } from 'store/reducers/UserSlice';
import { useAppDispatch } from 'shared/hooks/redux';
import styles from './Nav.module.scss';

interface NavProps {
  mobile: boolean;
  toggle?: () => void;
}

const Nav: React.FC<NavProps> = ({ mobile, toggle }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuth } = useAuth();
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
      <LangSwitcher />

      {isAuth ? (
        <Button type="primary" size="large" onClick={() => handleLogOut()}>
          Log Out
        </Button>
      ) : (
        <>
          <Button
            size="large"
            onClick={() => buttonClickHandler(ROUTES.signup)}
          >
            {t('button.signup')}
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={() => buttonClickHandler(ROUTES.login)}
          >
            {t('button.login')}
          </Button>
        </>
      )}
    </Space>
  );
};

export default Nav;
