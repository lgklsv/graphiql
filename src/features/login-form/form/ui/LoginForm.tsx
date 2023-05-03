import { Form, Input } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { ButtonForm } from 'shared/ui';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/redux';
import { userSelector } from 'store/selectors/user';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import style from './LoginForm.module.scss';

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const userState = useAppSelector(userSelector);
  const dispatch = useAppDispatch();

  const onFinish = (values: ILoginData) => {
    const { email, password } = values;

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = { userCredential };
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

    // console.log('Received values of form: ', values);
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
          { required: true, message: `${t('form.error.emptyMail')}` },
          { type: 'email', message: `${t('form.error.invalidMail')}` },
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder={`${t('form.placeholder.email')}`}
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: `${t('form.error.emptyPsw')}` }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder={`${t('form.placeholder.password')}`}
          size="large"
        />
      </Form.Item>

      <Form.Item>
        <ButtonForm text={t('button.login')} />
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
