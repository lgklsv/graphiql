import React from 'react';
import { Space, Typography, theme } from 'antd';
import { Footer } from 'antd/es/layout/layout';

import { DEVELOPERS } from 'shared/lib/constants';
import styles from './Footer.module.scss';

const { Text } = Typography;

const FooterComponent: React.FC = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  return (
    <Footer style={{ background: colorPrimary, padding: '0' }}>
      <div className={styles['footer-container']}>
        <Space direction="vertical" align="center" size={0}>
          <Space size={5}>
            <Text>graphiql engineered by</Text>
            <ul className={styles['footer-list']}>
              {DEVELOPERS.map(({ link, github }) => (
                <li key={link}>
                  <a href={link} target="_blank" rel="noreferrer">
                    {github}
                  </a>
                </li>
              ))}
            </ul>
          </Space>
          <Text>
            <Space>
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
              © 2023 graphiql. All rights reserved.
            </Space>
          </Text>
        </Space>
      </div>
    </Footer>
  );
};

export default FooterComponent;
