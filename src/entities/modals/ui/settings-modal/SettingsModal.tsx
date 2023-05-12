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
          title={t('modals.settings.cache.title')}
          subtitle={t('modals.settings.cache.subtitle')}
        >
          <Settings.Cache />
        </SettingContainer>
        <SettingContainer
          title={t('modals.settings.stats.title')}
          subtitle={t('modals.settings.stats.subtitle')}
        >
          <Settings.Stats />
        </SettingContainer>
        <SettingContainer
          title={t('modals.settings.clear.title')}
          subtitle={t('modals.settings.clear.subtitle')}
        >
          <Settings.Clear />
        </SettingContainer>
      </Space>
    </Modal>
  );
};

export default SettingsModal;
