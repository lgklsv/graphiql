import React from 'react';
import { Form, Input } from 'antd';
import { ButtonForm } from 'shared/ui';
import style from './SignUpForm.module.scss';

const SignUpForm: React.FC = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = React.useState({});

  // To disable submit button at the beginning.
  React.useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values: ILoginData) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name="normal_login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      layout="vertical"
      form={form}
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
        hasFeedback
      >
        <Input size="large" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          {
            pattern:
              /* eslint-disable-next-line */
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\[\]"\';:_\-<>\., =\+\/\\]).{8,}$/,
            message:
              'Password must contain at least one letter, one digit, one special character',
          },
        ]}
        hasFeedback
      >
        <Input.Password size="large" />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('The two passwords that you entered do not match!')
              );
            },
          }),
        ]}
      >
        <Input.Password size="large" />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <ButtonForm
            text="Get access"
            className={style.button}
            isDisabled={
              !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length)
                .length
            }
          />
        )}
      </Form.Item>
    </Form>
  );
};

export default SignUpForm;
