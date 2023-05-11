import { Modal, Space, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const { Text, Title } = Typography;

const SettingsModal: React.FC<ModalProps> = ({ isOpen, toggle }) => {
  const { t } = useTranslation();

  return (
    <Modal
      title={
        <Title level={2} style={{ margin: 0 }}>
          {t('modals.settings.title')}
        </Title>
      }
      open={isOpen}
      onCancel={toggle}
      centered
      footer={null}
      width={800}
    >
      <Space size={20} direction="vertical" style={{ width: '100%' }}>
        <Text>test</Text>
      </Space>
    </Modal>
  );
};

export default SettingsModal;
