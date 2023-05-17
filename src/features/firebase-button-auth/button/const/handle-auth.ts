import { MessageInstance } from 'antd/es/message/interface';
import { auth, db } from 'firebase';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { getFirestoreUserData } from 'shared/lib/firestore/constants';

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
  const tabCollectionsRef = collection(db, 'settings');

  signInWithPopup(auth, provider)
    .then(async ({ user }) => {
      const { email, uid, accessToken } = user as unknown as UserFirebase;
      dispatchFn({ email, id: uid, token: accessToken });
      const data = await getDocs(tabCollectionsRef);
      const filteredData = data.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((item) => item.id === uid);

      const a = await getFirestoreUserData(uid);

      console.log(filteredData, 'in LOGIN');
      console.log(a, 'in LOGIN=====>');
    })
    .catch((error) => {
      messageApi.open({
        key: 'updatable',
        type: 'error',
        content: error.message,
      });
    });
};
