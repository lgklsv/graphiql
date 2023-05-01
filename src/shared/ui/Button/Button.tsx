import { Button } from 'antd';
import './Button.scss';

interface ButtonFormProps {
  text: string;
  icon?: React.ReactNode;
  className?: string;
  onclick?: () => void;
}

export const ButtonForm: React.FC<ButtonFormProps> = ({
  text,
  onclick,
  className,
  icon,
}) => {
  return (
    <Button
      type="primary"
      htmlType="submit"
      className={`${className} form-button`}
      block
      size="large"
      icon={icon}
      onClick={() => onclick}
    >
      {text}
    </Button>
  );
};
