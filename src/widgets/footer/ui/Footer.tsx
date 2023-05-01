import React from 'react';
import { Space, Typography, theme } from 'antd';
import { Footer } from 'antd/es/layout/layout';

import styles from './Footer.module.scss';

const { Text } = Typography;

const DEVELOPERS = [
  {
    name: 'alesia-abaeva',
    link: 'https://github.com/alesia-abaeva',
  },
  {
    name: 'lgklsv',
    link: 'https://github.com/lgklsv/',
  },
  {
    name: 'marerma',
    link: 'https://github.com/marerma',
  },
];

const FooterComponent: React.FC = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <Footer style={{ background: colorPrimary }}>
      <div className={styles['footer-container']}>
        <div className={styles['footer-logo']}>
          <a
            href="https://rs.school/react/"
            target="_blank"
            rel="noreferrer"
            className={styles['footer-logo__link']}
          >
            <span className={styles['sr-only']}>
              Explore the info about school
            </span>
          </a>
        </div>
        <Space direction="vertical" align="center">
          <Text>graphiql engineered by:</Text>
          <ul className={styles['footer-list']}>
            {DEVELOPERS.map(({ name, link }) => (
              <li key={name}>
                <a href={link} target="_blank" rel="noreferrer">
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </Space>
        <Text>© 2023 graphiql. All rights reserved.</Text>
      </div>
    </Footer>
  );
};

export default FooterComponent;
