import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal, Space, Tooltip, Typography } from 'antd';
import {
  BookOutlined,
  MacCommandOutlined,
  ReloadOutlined,
  SettingOutlined,
} from '@ant-design/icons';

import { docsSelector } from 'store/selectors/DocsSelectors';
import { toggleDocs } from 'store/reducers/DocsSlice';
import { DocsExplorer } from 'entities/docs';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { ShortcutsModal } from 'entities/modals';
import styles from './Sidebar.module.scss';

const { Title } = Typography;

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { isDocs } = useAppSelector(docsSelector);
  const [isShortcutsModal, setIsShortcutsModal] = React.useState(false);

  const toggleShortcutsModal = () => {
    setIsShortcutsModal((prev) => !prev);
  };

  return (
    <>
      <div className={styles.sidebar}>
        <Tooltip
          placement="bottomLeft"
          title={t(`sandbox.tooltips.${isDocs ? 'docsOpen' : 'docsClose'}`)}
        >
          <Button
            onClick={() => dispatch(toggleDocs())}
            type="text"
            size="large"
            icon={<BookOutlined />}
          />
        </Tooltip>

        <Space direction="vertical">
          <Tooltip placement="bottomLeft" title={t('sandbox.tooltips.refetch')}>
            <Button type="text" size="large" icon={<ReloadOutlined />} />
          </Tooltip>
          <Tooltip
            placement="bottomLeft"
            title={t('sandbox.tooltips.shortcuts')}
          >
            <Button
              onClick={toggleShortcutsModal}
              type="text"
              size="large"
              icon={<MacCommandOutlined />}
            />
          </Tooltip>
          <Tooltip
            placement="bottomLeft"
            title={t('sandbox.tooltips.settings')}
          >
            <Button type="text" size="large" icon={<SettingOutlined />} />
          </Tooltip>
        </Space>
      </div>
      {isDocs && <DocsExplorer />}
      <Modal
        title={
          <Title level={2} style={{ margin: 0 }}>
            Shortcuts
          </Title>
        }
        open={isShortcutsModal}
        onCancel={toggleShortcutsModal}
        centered
        footer={null}
        width={800}
      >
        <ShortcutsModal />
      </Modal>
    </>
  );
};

export default Sidebar;
