import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button, Col, Row, Space, Typography } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { ROUTES } from 'pages/config';
import { useMatchMedia } from 'shared/hooks';
import { DEVELOPERS } from 'shared/lib/constants';
import DevCardList from './DevCardList';
import styles from './Home.module.scss';

const { Paragraph } = Typography;

// TODO: add isAuthorized check and adjust redirect buttons: If authorized redirect to sandbox, of not => SignUP

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isMobile } = useMatchMedia();
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className={styles.content}>
        <section className={styles.intro}>
          <div className={styles.intro__text}>
            <h1 className={styles.intro__heading}>
              The{' '}
              <span className={styles.intro__heading_gradient}>GraphQL</span>{' '}
              developer platform.
            </h1>
            <p className={styles.intro__text_full}>
              GraphiQL is the all-purpose IDE for your GraphQL API, empowering
              developers across your stack to ship early, ship often, and ship
              safely.
            </p>
          </div>
          <Space size={isMobile ? 'middle' : 'large'}>
            <Button size="large" ghost onClick={() => navigate(ROUTES.signup)}>
              Read the Docs
            </Button>
            <Button
              size="large"
              type="primary"
              onClick={() => navigate(ROUTES.sandbox)}
            >
              Get Started
              <RightOutlined />
            </Button>
          </Space>
        </section>
        <section className={styles.description}>
          <Row gutter={[32, 32]}>
            <Col span={isMobile ? 24 : 8}>
              <div className={styles.description__backgroundImage} />
            </Col>
            <Col span={isMobile ? 24 : 16}>
              <div className={styles.description__text}>
                <h2 className={styles.description__title}>
                  Your graph&apos;s command center
                </h2>
                <Paragraph className={styles.description__text_full}>
                  GraphiQL is end-to-end cloud platform for building, observing,
                  and evolving your graph. Validate schema changes, monitor
                  field usage, and route queries across any number of your
                  backend services.
                </Paragraph>
              </div>
            </Col>
          </Row>
        </section>
        <section className={styles.developers}>
          <h2 className={styles.developers__title}>Developers</h2>
          <DevCardList devCardList={DEVELOPERS} />
        </section>
      </div>
    </>
  );
};

export default Home;
