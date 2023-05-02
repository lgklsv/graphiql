import React from 'react';
import { Helmet } from 'react-helmet-async';
import Intro from './Intro/Intro';
import styles from './Home.module.scss';
import DevSection from './Developers/DevSection';
import Description from './Description/Description';

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className={styles.content}>
        <Intro />
        <Description />
        <DevSection />
      </div>
    </>
  );
};

export default Home;
