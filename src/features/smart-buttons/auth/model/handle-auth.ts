import { MessageInstance } from 'antd/es/message/interface';
import { auth } from 'firebase';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { convertFirestoreError } from 'shared/lib/firebase/utils/convertFirestoreError';

interface IHandleAuth {
  provider: GoogleAuthProvider | GithubAuthProvider;
  dispatchFn: UseUser;
  messageApi: MessageInstance;
  firestoreFn: (uid: string, messageApi: MessageInstance) => Promise<void>;
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
      await firestoreFn(uid, messageApi);
    })
    .catch((error) => {
      messageApi.open({
        key: 'updatable',
        type: 'error',
        content: convertFirestoreError(error.message),
      });
    });
};
