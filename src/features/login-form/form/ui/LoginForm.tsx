import { Form, Input } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { ButtonForm } from 'shared/ui';

import style from './LoginForm.module.scss';

const LoginForm: React.FC = () => {
  const onFinish = (values: ILoginData) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name="normal_login"
      className={style.login_form}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          { required: true, message: 'Please input your Email!' },
          { type: 'email', message: 'Please input valid Email!' },
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email Address"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          size="large"
        />
      </Form.Item>

      <Form.Item>
        <ButtonForm text="Log in" />
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
