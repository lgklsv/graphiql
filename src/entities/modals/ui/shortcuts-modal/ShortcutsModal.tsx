/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Table, Space, Typography, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import type { ColumnsType } from 'antd/es/table';

const { Text, Title } = Typography;

interface DataType {
  key: string;
  shortcut: string[];
  function: string;
}

const ShortcutsModal: React.FC<ModalProps> = ({ isOpen, toggle }) => {
  const { t } = useTranslation();

  const columns: ColumnsType<DataType> = [
    {
      title: t('modals.shortcuts.columns.keys'),
      dataIndex: 'shortcut',
      key: 'shortcuts',
      render: (_, { shortcut }) => {
        return (
          <>
            {shortcut
              .join(' + ')
              .split(' ')
              .map((key, id) => {
                if (key === '+') return <Text key={id}>{key}</Text>;
                return (
                  <Text keyboard key={id}>
                    {key}
                  </Text>
                );
              })}
          </>
        );
      },
    },
    {
      title: t('modals.shortcuts.columns.functions'),
      key: 'function',
      dataIndex: 'function',
      render: (text) => <Text>{text}</Text>,
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      shortcut: ['Ctrl', 'K'],
      function: t('modals.shortcuts.function.search'),
    },
    {
      key: '2',
      shortcut: ['Ctrl', 'Enter'],
      function: t('modals.shortcuts.function.query'),
    },
    {
      key: '3',
      shortcut: ['Shift', 'P'],
      function: t('modals.shortcuts.function.prettify'),
    },
    {
      key: '4',
      shortcut: ['Shift', 'C'],
      function: t('modals.shortcuts.function.copy'),
    },
    {
      key: '5',
      shortcut: ['Shift', 'D'],
      function: t('modals.shortcuts.function.download'),
    },
    {
      key: '6',
      shortcut: ['Shift', 'R'],
      function: t('modals.shortcuts.function.refetch'),
    },
  ];

  return (
    <Modal
      title={
        <Title level={2} style={{ margin: 0 }}>
          {t('modals.shortcuts.title')}
        </Title>
      }
      open={isOpen}
      onCancel={toggle}
      centered
      footer={null}
      width={800}
    >
      <Space size={20} direction="vertical" style={{ width: '100%' }}>
        <Table pagination={false} columns={columns} dataSource={data} />
        <Text>{t('modals.shortcuts.message')}</Text>
      </Space>
    </Modal>
  );
};

export default ShortcutsModal;
