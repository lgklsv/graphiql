import { GoogleOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { googleProvider } from 'firebase';
import { useUser } from 'shared/hooks/use-user';
import { authProvider } from '../const/handle-auth';
import style from './Buttons.module.scss';

const GoogleButton = () => {
  const dispatchUser = useUser();

  const [messageApi, contextHolder] = message.useMessage();

  const handleAuth = () => {
    authProvider({
      provider: googleProvider,
      dispatchFn: dispatchUser,
      messageApi,
    });
  };

  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        htmlType="submit"
        className={`${style.google_btn} ${style.form_button}`}
        block
        size="large"
        icon={<GoogleOutlined />}
        onClick={handleAuth}
      >
        Sign in with Google
      </Button>
    </>
  );
};

export default GoogleButton;
