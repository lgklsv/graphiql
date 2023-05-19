import React from 'react';
import { useTranslation } from 'react-i18next';

import { SButton } from 'features/smart-buttons';
import { useTabs } from 'shared/hooks/use-tab';
import { SHORTCUTS } from 'app/config';
import styles from './Toolbar.module.scss';

const Toolbar: React.FC = () => {
  const { t } = useTranslation();
  const { tabQuery } = useTabs();
  return (
    <div className={styles.toolbar}>
      <SButton.Execute />
      <SButton.Prettify />
      <SButton.Copy
        data={tabQuery.data}
        defaultTooltip={t('sandbox.tooltips.copy.default')}
        shortcut={SHORTCUTS.copy}
      />
    </div>
  );
};

export default Toolbar;
