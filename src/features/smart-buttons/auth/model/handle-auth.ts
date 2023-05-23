import { MessageInstance } from 'antd/es/message/interface';
import { auth, db } from 'firebase';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

interface IHandleAuth {
  provider: GoogleAuthProvider | GithubAuthProvider;
  dispatchFn: UseUser;
  messageApi: MessageInstance;
  firestoreFn: (
    uid: string,
    setLoading?: (load: boolean) => void
  ) => Promise<void>;
}

export const authProvider = async ({
  provider,
  dispatchFn,
  messageApi,
  firestoreFn,
}: IHandleAuth) => {
  signInWithPopup(auth, provider)
    .then(async ({ user }) => {
      const { email, uid, accessToken } = user as unknown as UserFirebase;
      dispatchFn({ email, id: uid, token: accessToken });
      await firestoreFn(uid);
    })
    .catch((error) => {
      messageApi.open({
        key: 'updatable',
        type: 'error',
        content: error.message,
      });
    });
};
