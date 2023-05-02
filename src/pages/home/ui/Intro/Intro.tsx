import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Space, Grid } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { ROUTES } from 'pages/config';
import styles from './Intro.module.scss';

// TODO: add isAuthorized check and adjust redirect buttons: If authorized redirect to sandbox, of not => SignUP

const { useBreakpoint } = Grid;

const Intro: React.FC = () => {
  const navigate = useNavigate();
  const screens = useBreakpoint();

  return (
    <section className={styles.intro}>
      <div className={styles.intro__text}>
        <h1 className={styles.intro__heading}>
          The <span className={styles.intro__heading_gradient}>GraphQL</span>{' '}
          developer platform.
        </h1>
        <p className={styles.intro__text_full}>
          GraphiQL is the all-purpose IDE for your GraphQL API, empowering
          developers across your stack to ship early, ship often, and ship
          safely.
        </p>
      </div>
      <Space size={screens.xs ? 'middle' : 'large'}>
        <Button
          size={screens.xs ? 'middle' : 'large'}
          ghost
          href="https://github.com/lgklsv/graphiql"
        >
          Read the Docs
        </Button>
        <Button
          size={screens.xs ? 'middle' : 'large'}
          type="primary"
          onClick={() => navigate(ROUTES.sandbox)}
        >
          Get Started
          <RightOutlined />
        </Button>
      </Space>
    </section>
  );
};

export default Intro;
