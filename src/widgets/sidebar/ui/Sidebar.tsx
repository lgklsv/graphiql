import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Grid, Space, Tooltip } from 'antd';
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
import { AnimatePresence } from 'framer-motion';
import styles from './Sidebar.module.scss';

const { useBreakpoint } = Grid;

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { isDocs } = useAppSelector(docsSelector);
  const [isShortcutsModal, setIsShortcutsModal] = React.useState(false);
  const screens = useBreakpoint();

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

        <Space
          direction={
            (screens.sm && !screens.md) || (screens.xs && !screens.md)
              ? 'horizontal'
              : 'vertical'
          }
        >
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
      <AnimatePresence>{isDocs && <DocsExplorer />}</AnimatePresence>
      <ShortcutsModal isOpen={isShortcutsModal} toggle={toggleShortcutsModal} />
    </>
  );
};

export default Sidebar;
