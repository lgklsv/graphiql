import { MessageInstance } from 'antd/es/message/interface';
import { auth } from 'firebase';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

interface IHandleAuth {
  provider: GoogleAuthProvider | GithubAuthProvider;
  dispatchFn: UseUser;
  messageApi: MessageInstance;
}

export const authProvider = ({
  provider,
  dispatchFn,
  messageApi,
}: IHandleAuth) => {
  signInWithPopup(auth, provider)
    .then(({ user }) => {
      const { email, uid, accessToken } = user as unknown as UserFirebase;
      dispatchFn({ email, id: uid, token: accessToken });
    })
    .catch((error) => {
      messageApi.open({
        key: 'updatable',
        type: 'error',
        content: error.message,
      });
    });
};
