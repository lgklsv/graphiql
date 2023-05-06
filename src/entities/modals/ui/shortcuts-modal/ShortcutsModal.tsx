/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Table, Space, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Text } = Typography;

interface DataType {
  key: string;
  shortcut: string[];
  function: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Shortcuts',
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
    title: 'Function',
    key: 'function',
    dataIndex: 'function',
    render: (text) => <Text>{text}</Text>,
  },
];

const data: DataType[] = [
  {
    key: '1',
    shortcut: ['Ctrl', 'K'],
    function: 'Search in documentation',
  },
  {
    key: '2',
    shortcut: ['Ctrl', 'Enter'],
    function: 'Execute query',
  },
  {
    key: '3',
    shortcut: ['Ctrl', 'Shift', 'P'],
    function: 'Prettify editors',
  },
  {
    key: '4',
    shortcut: ['Ctrl', 'Shift', 'C'],
    function: 'Copy query',
  },
  {
    key: '5',
    shortcut: ['Ctrl', 'Shift', 'R'],
    function: 'Re-fetch schema using introspection',
  },
];

const ShortcutsModal: React.FC = () => {
  return (
    <Space size={20} direction="vertical" style={{ width: '100%' }}>
      <Table pagination={false} columns={columns} dataSource={data} />
      <Text>The editors use CodeMirror Key Maps that add more short keys.</Text>
    </Space>
  );
};

export default ShortcutsModal;
