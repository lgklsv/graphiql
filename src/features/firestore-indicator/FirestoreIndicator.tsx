import React from 'react';
import { Badge } from 'antd';
import { useTranslation } from 'react-i18next';

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
  const { t, i18n } = useTranslation();
  const { isUpdating, isError, userDataLoading } =
    useAppSelector(firestoreSelector);
  let status: StatusTypes = 'success';
  let text = t('firebaseIndicator.success.text');
  let tooltipText = t('firebaseIndicator.success.tooltip');

  if (isError) {
    status = 'error';
    text = t('firebaseIndicator.error.text');
    tooltipText = t('firebaseIndicator.error.tooltip');
  }

  if (isUpdating) {
    status = 'processing';
    text = t('firebaseIndicator.processing.text');
    tooltipText = t('firebaseIndicator.processing.tooltip');
  }

  if (userDataLoading) {
    status = 'processing';
    text = t('firebaseIndicator.userDataLoading.text');
    tooltipText = t('firebaseIndicator.userDataLoading.tooltip');
  }

  return (
    <div
      className={`${styles.indicator} ${
        i18n.language === 'ru' ? styles.indicator_wide : ''
      }`}
    >
      <AppTooltip title={tooltipText}>
        <span>
          <Badge status={status} text={text} />
        </span>
      </AppTooltip>
    </div>
  );
};

export default FirestoreIndicator;
