import React from 'react';
import { Form, Input, message } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'firebase';

import { ButtonForm } from 'shared/ui';
import { useUser } from 'shared/hooks/use-user';
import { useDataFromFirestore } from 'shared/lib/firestore/hook';
import { convertFirestoreError } from 'shared/lib/firebase/utils/convertFirestoreError';
import style from './LoginForm.module.scss';

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const dispatchUser = useUser();
  const dispatchFirestoreData = useDataFromFirestore();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setLoading] = React.useState(false);
  // TODO: check state loading data from firestore

  const onFinish = (values: ILoginData) => {
    messageApi.open({
      key: 'updatable',
      type: 'loading',
      content: `${t('loader')}`,
    });

    const { email: emailValues, password } = values;

    signInWithEmailAndPassword(auth, emailValues, password)
      .then(async ({ user }) => {
        const { email, uid, accessToken } = user as unknown as UserFirebase;

        dispatchUser({ email, id: uid, token: accessToken });
        await dispatchFirestoreData(uid, setLoading, messageApi);
      })
      .catch((error) => {
        messageApi.open({
          key: 'updatable',
          type: 'error',
          content: convertFirestoreError(error.message),
        });
      });
  };

  return (
    <>
      {contextHolder}
      <Form
        name="login"
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
    </>
  );
};

export default LoginForm;
