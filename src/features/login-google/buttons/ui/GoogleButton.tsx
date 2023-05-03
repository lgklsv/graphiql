import { GoogleOutlined } from '@ant-design/icons';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from 'firebase';
import { Button } from 'antd';

import style from './Buttons.module.scss';

const GoogleButton = () => {
  const provider = new GoogleAuthProvider();

  const handleAuth = () => {
    console.log('click google');

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        // TODO:
        // const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
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
  );
};

export default GoogleButton;
