import React from 'react';
import { Modal, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { Settings } from 'features/settings';
import SettingContainer from './SettingContainer';

const { Title } = Typography;

const SettingsModal: React.FC<ModalProps> = ({ isOpen, toggle }) => {
  const { t } = useTranslation();

  return (
    <Modal
      title={<Title level={2}>{t('modals.settings.title')}</Title>}
      open={isOpen}
      onCancel={toggle}
      centered
      footer={null}
      width={800}
    >
      <Space size={0} direction="vertical" style={{ width: '100%' }}>
        <SettingContainer
          title="Disable cache"
          subtitle="All GraphQL requests will run without cache"
        >
          <Settings.Cache />
        </SettingContainer>
        <SettingContainer
          title="Show statistics"
          subtitle="Enables request time indicator"
        >
          <Settings.Stats />
        </SettingContainer>
        <SettingContainer
          title="Clear storage"
          subtitle="Remove all locally stored data and start fresh"
        >
          <Settings.Clear />
        </SettingContainer>
      </Space>
    </Modal>
  );
};

export default SettingsModal;
