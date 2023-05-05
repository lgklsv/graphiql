import { DownOutlined, GlobalOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';

import styles from './LangSwitcher.module.scss';

const LANGUAGES: MenuProps['items'] = [
  {
    label: 'English',
    key: 'en',
  },
  {
    label: 'Русский',
    key: 'ru',
  },
];

const LangSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const handleLanguageChange: MenuProps['onClick'] = (e) => {
    i18n.changeLanguage(e.key);
  };

  const menuProps = {
    items: LANGUAGES,
    onClick: handleLanguageChange,
    selectable: true,
    defaultSelectedKeys: [i18n.resolvedLanguage],
  };

  return (
    <Dropdown trigger={['click']} menu={menuProps}>
      <Button size="large" className={styles.btn}>
        <Space>
          <GlobalOutlined />
          <DownOutlined style={{ fontSize: 12 }} />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default LangSwitcher;
