import { FolderOutlined, FolderOpenOutlined } from '@ant-design/icons';
import styles from './SectionTitle.module.scss';

interface SectionTitleProps {
  isTitle?: boolean;
  title?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  isTitle,
}) => {
  return (
    <div className={styles.doc_section_title}>
      {isTitle ? (
        <>
          <FolderOutlined />
          <span>Root type</span>
        </>
      ) : (
        <>
          <FolderOpenOutlined />
          <span> {title || 'Field type'}</span>
        </>
      )}
    </div>
  );
};
