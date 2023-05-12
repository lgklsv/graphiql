import { useTranslation } from 'react-i18next';
import { FolderOutlined, FolderOpenOutlined } from '@ant-design/icons';
import styles from './SectionTitle.module.scss';

interface SectionTitleProps {
  isTitle?: boolean;
  title?: string | null;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  isTitle,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.doc_section_title}>
      {isTitle ? (
        <>
          <FolderOutlined />
          <span>{t('docs.explorer.sectionTitleRoot')}</span>
        </>
      ) : (
        <>
          <FolderOpenOutlined />
          <span> {title || t('docs.explorer.sectionTitleField')}</span>
        </>
      )}
    </div>
  );
};
