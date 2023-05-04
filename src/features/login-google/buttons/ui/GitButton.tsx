import { GithubOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { auth } from 'firebase';
import { signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { ROUTES } from 'pages/config';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'shared/lib/hooks/redux';
import { setUser } from 'store/reducers/UserSlice';
import style from './Buttons.module.scss';

const provider = new GithubAuthProvider();

const GitButton = () => {
  // TODO: create hook?
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

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
        className={`${style.git_btn} ${style.form_button}`}
        block
        size="large"
        icon={<GithubOutlined />}
        onClick={handleAuth}
      >
        Sign in with GitHub
      </Button>
    </>
  );
};

export default GitButton;
