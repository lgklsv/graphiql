import { Button } from 'antd';
import style from './Button.module.scss';

interface ButtonFormProps {
  text: string;
  icon?: React.ReactNode;
  className?: string;
  onclick?: () => void;
  isDisabled?: boolean;
}

const ButtonForm: React.FC<ButtonFormProps> = ({
  text,
  onclick,
  className,
  icon,
  isDisabled,
}) => {
  return (
    <Button
      type="primary"
      htmlType="submit"
      className={`${className} ${style.form_button}`}
      block
      size="large"
      icon={icon}
      onClick={() => onclick}
      disabled={isDisabled}
    >
      {text}
    </Button>
  );
};

export default ButtonForm;
