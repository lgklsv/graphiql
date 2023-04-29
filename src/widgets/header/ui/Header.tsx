import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ROUTES } from 'pages/config';
import './Header.scss';

const HeaderComponent: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header-container">
        <Link to={ROUTES.home} className="logo" />
        <div className="buttons">
          <Button
            type="primary"
            size="large"
            onClick={() => navigate(ROUTES.signup)}
          >
            Sign Up
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate(ROUTES.login)}
          >
            Log In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
