import { Button } from 'antd';
import { SectionTitle } from './SectionTitle';

interface AllSchemaTypesProps {
  definitions?: IJson;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}
export const AllSchemaTypes: React.FC<AllSchemaTypesProps> = ({
  definitions,
  onClick,
}) => {
  if (!definitions) {
    return null;
  }

  const arrayNameTypes = definitions && Object.keys(definitions);

  return (
    <div>
      <SectionTitle title="All Schema Types" />

      {arrayNameTypes.map((name) => (
        <Button
          key={name}
          type="link"
          htmlType="submit"
          size="large"
          onClick={(e) => onClick(e)}
        >
          {name}
        </Button>
      ))}
    </div>
  );
};
