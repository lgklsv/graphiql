import React from 'react';
import { Button } from 'antd';

import styles from './DocsText.module.scss';

interface DocsTextProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  active?: boolean;
  onClick?: (...args: React.MouseEvent<HTMLElement>[]) => void;
}

const DocsText: React.FC<DocsTextProps> = ({
  children,
  icon,
  className,
  style,
  active,
  onClick,
}) => {
  return (
    <Button
      type="link"
      htmlType="submit"
      size="large"
      icon={icon}
      onClick={onClick}
      className={`${className} ${active ? styles.active : ''}`}
      style={{
        padding: 0,
        cursor: 'auto',
        height: '0',
        ...style,
      }}
    >
      {children}
    </Button>
  );
};

export default DocsText;
