import React from 'react';
import { Button } from 'antd';

import styles from './DocsText.module.scss';

interface DocsTextProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  active?: boolean;
  noTabIndex?: boolean;
  onClick?: (...args: React.MouseEvent<HTMLElement>[]) => void;
}

const DocsText: React.FC<DocsTextProps> = ({
  children,
  icon,
  className,
  style,
  active,
  noTabIndex,
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
      disabled={noTabIndex}
      style={{
        padding: 0,
        cursor: 'auto',
        height: 'fit-content',
        color: noTabIndex ? '#281E5B' : undefined,
        ...style,
      }}
    >
      {children}
    </Button>
  );
};

export default DocsText;
