import { GithubOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { gitProvider } from 'firebase';
import { useUser } from 'shared/hooks/use-user';
import { authProvider } from '../const/handle-auth';
import style from './Buttons.module.scss';

const GitButton: React.FC = () => {
  const dispatchUser = useUser();

  const [messageApi, contextHolder] = message.useMessage();

  const handleAuth = () => {
    authProvider({
      provider: gitProvider,
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
