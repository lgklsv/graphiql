import { Space } from 'antd';
import { useTranslation } from 'react-i18next';

import { SectionTitle } from '../section-title/SectionTitle';
import DocsText from '../docs-text/DocsText';

import styles from './AllSchemaTypes.module.scss';

interface AllSchemaTypesProps {
  definitions?: IJson;
  onPropClick: (e: React.MouseEvent<HTMLElement>) => void;
}
export const AllSchemaTypes: React.FC<AllSchemaTypesProps> = ({
  definitions,
  onPropClick,
}) => {
  const { t } = useTranslation();

  if (!definitions) {
    return null;
  }

  const arrayNameTypes = definitions && Object.keys(definitions);

  return (
    <Space direction="vertical">
      <SectionTitle title={t('docs.explorer.sectionTitleAll')} />

      <Space direction="vertical" size={10}>
        {arrayNameTypes.map((name) => (
          <DocsText
            key={name}
            onClick={(e: React.MouseEvent<HTMLElement>) => onPropClick(e)}
            className={styles.item}
          >
            {name}
          </DocsText>
        ))}
      </Space>
    </Space>
  );
};
