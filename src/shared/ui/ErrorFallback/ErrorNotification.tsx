/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from 'react';
import { Button, Space, notification } from 'antd';
import { useTranslation } from 'react-i18next';

interface ErrorNotificationProps {
  errorMsg: string | null;
  onReset?: () => void;
}

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  errorMsg,
  onReset,
}: ErrorNotificationProps) => {
  const { t } = useTranslation();
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = useCallback(
    (type: NotificationType) => {
      api[type]({
        key: 'error-message',
        message: `${t('errorBoundary.errorTitle')}`,
        description: (
          <Space direction="vertical" align="start">
            <p>{errorMsg || t('errorBoundary.defaultMsg')}</p>
            {onReset && (
              <Button type="primary" onClick={onReset}>
                {' '}
                {t('errorBoundary.errorReset')}
              </Button>
            )}
          </Space>
        ),
        duration: 0,
      });
    },
    [api, errorMsg]
  );

  useEffect(() => {
    openNotificationWithIcon('error');
    return () => notification.destroy('error-message');
  }, [openNotificationWithIcon]);

  return <div>{contextHolder}</div>;
};

export default ErrorNotification;
