import { useEffect, useState } from 'react';
import { DownOutlined, GlobalOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';

import i18n from '../../shared/lib/i18n/i18n';

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

const handleLanguageChange: MenuProps['onClick'] = (e) => {
  i18n.changeLanguage(e.key);
};

const menuProps = {
  items: LANGUAGES,
  onClick: handleLanguageChange,
  selectable: true,
};

const LangSwitcher = () => {
  const [selectedLang, setSelectedLang] = useState('');

  useEffect(() => {
    const detectedLang = i18n.language;
    setSelectedLang(detectedLang);
  }, []);

  return (
    <Dropdown
      trigger={['click']}
      menu={{ ...menuProps, defaultSelectedKeys: [selectedLang] }}
    >
      <Button size="large">
        <Space>
          <GlobalOutlined />
          <DownOutlined style={{ fontSize: 12 }} />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default LangSwitcher;
