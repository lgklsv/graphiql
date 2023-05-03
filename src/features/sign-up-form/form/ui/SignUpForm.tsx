import React from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { ButtonForm } from 'shared/ui';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useAppDispatch } from 'shared/lib/hooks/redux';
import { setUser } from 'store/reducers/UserSlice';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'pages/config';
import style from './SignUpForm.module.scss';

const SignUpForm: React.FC = () => {
  const { t } = useTranslation();
  const userState = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [, forceUpdate] = React.useState({});

  const navigate = useNavigate();

  const isConfirm = (value: string, password: string) => {
    if (!value || password === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error(`${t('form.error.notMatchingPsw')}`));
  };

  // To disable submit button at the beginning.
  React.useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values: ILoginData) => {
    const { email: emailValues, password } = values;

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, emailValues, password)
      .then(({ user }) => {
        const { email, uid, accessToken } = user as unknown as UserFirebase;
        dispatch(setUser({ email, token: accessToken, id: uid }));
        navigate(ROUTES.sandbox, { replace: true });
        // redirect on sandbox
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
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
        label={t('form.fields.email')}
        rules={[
          {
            type: 'email',
            message: `${t('form.error.invalidMail')}`,
          },
          {
            required: true,
            message: `${t('form.error.emptyMail')}`,
          },
        ]}
        hasFeedback
      >
        <Input size="large" />
      </Form.Item>
      <Form.Item
        name="password"
        label={t('form.fields.password')}
        rules={[
          {
            required: true,
            message: `${t('form.error.emptyPsw')}`,
          },
          {
            pattern:
              /* eslint-disable-next-line */
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\[\]"\';:_\-<>\., =\+\/\\]).{8,}$/,
            message: `${t('form.error.invalidPsw')}`,
          },
        ]}
        hasFeedback
      >
        <Input.Password size="large" />
      </Form.Item>
      <Form.Item
        name="confirm"
        label={t('form.fields.confirmPsw')}
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: `${t('form.error.confirmPsw')}`,
          },
          ({ getFieldValue }) => ({
            validator: (_, value) =>
              isConfirm(value, getFieldValue('password')),
          }),
        ]}
      >
        <Input.Password size="large" />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <ButtonForm
            text={t('button.access')}
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
