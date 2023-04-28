import React from 'react';
import { Button } from 'antd';
import './Header.scss';
import { ROUTES } from 'pages/config';
import { Link } from 'react-router-dom';

const HeaderComponent: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" />
        <div className="buttons">
          <Button>
            <Link to={ROUTES.signup}>Sign Up</Link>
          </Button>
          <Button>
            <Link to={ROUTES.signup}>Log In</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
