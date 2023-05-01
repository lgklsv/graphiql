import { Input } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';

interface InputFieldProps {
  placeholder?: string;
  size?: SizeType;
  type?: string;
  prefix?: React.ReactNode;
}

export const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  size,
  prefix,
  type,
}) => {
  return (
    <Input
      prefix={prefix}
      placeholder={placeholder || 'Email Address'}
      size={size || 'large'}
      type={type || 'email'}
    />
  );
};
