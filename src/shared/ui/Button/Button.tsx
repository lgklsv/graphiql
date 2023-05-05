import { Button } from 'antd';
import style from './Button.module.scss';

interface ButtonFormProps {
  text: string;
  icon?: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
}

const ButtonForm: React.FC<ButtonFormProps> = ({
  text,
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
      disabled={isDisabled}
    >
      {text}
    </Button>
  );
};

export default ButtonForm;
