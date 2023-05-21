import { Badge } from 'antd';
import React from 'react';
import { useAppSelector } from 'shared/hooks/redux';
import { firestoreSelector } from 'store/selectors/firestoreSelector';

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

  return (
    <div className={styles.indicator}>
      <Badge status={status} text={text} />
    </div>
  );
};

export default FirestoreIndicator;
