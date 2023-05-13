import { useTranslation } from 'react-i18next';
import { FolderTwoTone, FolderOpenTwoTone } from '@ant-design/icons';
import { Space, Typography } from 'antd';

const { Text } = Typography;

interface SectionTitleProps {
  isRootType?: boolean;
  title?: string | null;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  isRootType,
}) => {
  const { t } = useTranslation();

  if (isRootType) {
    return (
      <Space>
        <FolderTwoTone twoToneColor="#8C8C8C" style={{ scale: '1.2' }} />
        <Text style={{ fontSize: '16px' }} type="secondary">
          {t('docs.explorer.sectionTitleRoot')}
        </Text>
      </Space>
    );
  }

  return (
    <Space>
      <FolderOpenTwoTone twoToneColor="#8C8C8C" style={{ scale: '1.2' }} />
      <Text style={{ fontSize: '16px' }} type="secondary">
        {title || t('docs.explorer.sectionTitleField')}
      </Text>
    </Space>
  );
};
