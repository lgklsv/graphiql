import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { GoogleOutlined } from '@ant-design/icons';
import { auth } from 'firebase';
import { Button, message } from 'antd';
import { useAppDispatch } from 'shared/lib/hooks/redux';
import { setUser } from 'store/reducers/UserSlice';
import { ROUTES } from 'pages/config';
import style from './Buttons.module.scss';

const GoogleButton = () => {
  // TODO: create hook?
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const provider = new GoogleAuthProvider();

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        const { email, uid, accessToken } = user as unknown as UserFirebase;
        dispatch(setUser({ email, token: accessToken, id: uid }));
        navigate(ROUTES.sandbox, { replace: true });
      })
      .catch((error) => {
        messageApi.open({
          key: 'updatable',
          type: 'error',
          content: error.message,
        });
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
