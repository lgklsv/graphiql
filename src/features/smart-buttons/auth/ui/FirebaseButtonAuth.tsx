import { Button, message } from 'antd';
import { GoogleAuthProvider } from 'firebase/auth';

import { useUser } from 'shared/hooks/use-user';
import { useDataFromFirestore } from 'shared/lib/firestore/hook';
import { authProvider } from '../model/handle-auth';

interface IProviderButton {
  provider: GoogleAuthProvider;
  icon: React.ReactNode;
  text: string;
  className: string;
}

const FirebaseAuthButton: React.FC<IProviderButton> = ({
  provider,
  icon,
  text,
  className,
}) => {
  const dispatchUser = useUser();
  const dispachFirestoreData = useDataFromFirestore();

  const [messageApi, contextHolder] = message.useMessage();

  const handleAuth = () => {
    authProvider({
      provider,
      dispatchFn: dispatchUser,
      messageApi,
      firestoreFn: dispachFirestoreData,
    });
  };

  return (
    <>
      {contextHolder}
      <Button
        type="primary"
        htmlType="submit"
        className={`${className}`}
        block
        size="large"
        icon={icon}
        onClick={handleAuth}
      >
        {text}
      </Button>
    </>
  );
};

export default FirebaseAuthButton;
