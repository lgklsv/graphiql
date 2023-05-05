interface IDispatchUser {
  email: string;
  id: string;
  token: string;
}

type UseUser = (props: IDispatchUser) => void;
