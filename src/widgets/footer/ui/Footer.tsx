import React from 'react';
import { Space, Typography, theme } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import './Footer.scss';

const { Text } = Typography;

const FooterComponent: React.FC = () => {
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

  const {
    token: { colorFillAlter },
  } = theme.useToken();

  return (
    <Footer style={{ background: colorFillAlter }}>
      <div className="footer-container">
        <div className="footer-logo">
          <a
            href="https://rs.school/react/"
            target="_blank"
            rel="noreferrer"
            className="footer-logo__link"
          >
            <span className="sr-only">Explore the info about school</span>
          </a>
        </div>
        <Space direction="vertical" align="center">
          <Text>Engineered By:</Text>
          <ul className="footer-list">
            {DEVELOPERS.map(({ name, link }) => (
              <li key={name}>
                <a href={link} target="_blank" rel="noreferrer">
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </Space>
        <Text>Copyright © 2023</Text>
      </div>
    </Footer>
  );
};

export default FooterComponent;
