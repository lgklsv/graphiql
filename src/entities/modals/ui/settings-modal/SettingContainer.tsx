import React from 'react';
import { Space, Typography } from 'antd';
import styles from './SettingContainer.module.scss';

interface SettingContainerProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const { Text, Title } = Typography;

const SettingContainer: React.FC<SettingContainerProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className={styles.container}>
      <Space direction="vertical" size={0}>
        <Title level={3} style={{ margin: 0 }}>
          {title}
        </Title>
        <Text style={{ fontSize: '1rem' }} type="secondary">
          {subtitle}
        </Text>
      </Space>
      {children}
    </div>
  );
};

export default SettingContainer;
