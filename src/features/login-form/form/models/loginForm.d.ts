interface ILoginData {
  email: string;
  password: string;
}

interface UserFirebase extends import('firebase/auth').User {
  accessToken: string;
  email: string;
  uid: string;
}
