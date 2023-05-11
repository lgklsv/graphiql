import { FolderOutlined, FolderOpenOutlined } from '@ant-design/icons';

interface SectionTitleProps {
  title: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <div>
      {!title ? (
        <div>
          <FolderOutlined />
          <span>Root type</span>
        </div>
      ) : (
        <div>
          <FolderOpenOutlined />
          <span> Field type</span>
        </div>
      )}
    </div>
  );
};
