import { FolderOutlined, FolderOpenOutlined } from '@ant-design/icons';

interface SectionTitleProps {
  isTitle?: boolean;
  title?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  isTitle,
}) => {
  return (
    <div>
      {isTitle ? (
        <div>
          <FolderOutlined />
          <span>Root type</span>
        </div>
      ) : (
        <div>
          <FolderOpenOutlined />
          <span> {title || 'Field type'}</span>
        </div>
      )}
    </div>
  );
};
