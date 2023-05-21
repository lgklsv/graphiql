import { Badge } from 'antd';
import React from 'react';
import { useAppSelector } from 'shared/hooks/redux';
import { firestoreSelector } from 'store/selectors/firestoreSelector';

import { AppTooltip } from 'shared/ui';
import styles from './FirestoreIndicator.module.scss';

type StatusTypes =
  | 'error'
  | 'default'
  | 'processing'
  | 'success'
  | 'warning'
  | undefined;

const FirestoreIndicator: React.FC = () => {
  const { isUpdating } = useAppSelector(firestoreSelector);

  const status: StatusTypes = isUpdating ? 'processing' : 'success';
  const text = isUpdating ? 'Saving...' : 'Saved';
  const tooltipText = isUpdating
    ? 'Syncing data with Firestore'
    : 'All changes saved to Firestore';

  return (
    <div className={styles.indicator}>
      <AppTooltip title={tooltipText}>
        <Badge status={status} text={text} />
      </AppTooltip>
    </div>
  );
};

export default FirestoreIndicator;
