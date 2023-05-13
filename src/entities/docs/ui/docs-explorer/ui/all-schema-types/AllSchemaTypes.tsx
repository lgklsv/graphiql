import { Button, Space } from 'antd';
import { useTranslation } from 'react-i18next';

import { SectionTitle } from '../section-title/SectionTitle';
import styles from './AllSchemaTypes.module.scss';

interface AllSchemaTypesProps {
  definitions?: IJson;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}
export const AllSchemaTypes: React.FC<AllSchemaTypesProps> = ({
  definitions,
  onClick,
}) => {
  const { t } = useTranslation();

  if (!definitions) {
    return null;
  }

  const arrayNameTypes = definitions && Object.keys(definitions);

  return (
    <Space direction="vertical" size={0}>
      <SectionTitle title={t('docs.explorer.sectionTitleAll')} />

      {arrayNameTypes.map((name) => (
        <Button
          key={name}
          type="link"
          htmlType="submit"
          size="large"
          onClick={(e) => onClick(e)}
          style={{
            paddingBottom: 0,
            paddingTop: 0,
            height: 'auto',
          }}
          className={styles.item}
        >
          {name}
        </Button>
      ))}
    </Space>
  );
};
