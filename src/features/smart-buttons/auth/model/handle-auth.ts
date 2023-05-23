import { MessageInstance } from 'antd/es/message/interface';
import { auth, db } from 'firebase';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import {
  createFirestoreData,
  getFirestoreData,
} from 'shared/lib/firestore/rest-firestore';
import { checkEntryDatabase } from 'shared/lib/firestore/utils';

interface IHandleAuth {
  provider: GoogleAuthProvider | GithubAuthProvider;
  dispatchFn: UseUser;
  messageApi: MessageInstance;
}

export const authProvider = async ({
  provider,
  dispatchFn,
  messageApi,
}: IHandleAuth) => {
  signInWithPopup(auth, provider)
    .then(async ({ user }) => {
      const { email, uid, accessToken } = user as unknown as UserFirebase;
      dispatchFn({ email, id: uid, token: accessToken });

      await checkEntryDatabase(uid);

      // const isHaveData = doc(db, 'settings', uid);
      // const docSnap = await getDoc(isHaveData);
      // if (docSnap.exists()) {
      //   await getFirestoreData(uid);
      // } else {
      //   await createFirestoreData(uid);
      // }
    })
    .catch((error) => {
      messageApi.open({
        key: 'updatable',
        type: 'error',
        content: error.message,
      });
    });
};
