import { CredentialResponse, GoogleOAuthProvider } from '@react-oauth/google';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type User = {
  name: string;
};

export const UserLogInStatus = {
  loggedIn: 'loggedIn',
  loggedOut: 'loggedOut',
} as const;

type UserContextState = {
  user: User | null;
  status: keyof typeof UserLogInStatus | null;
};

type UserContextType = UserContextState & {
  logIn: (creds: CredentialResponse) => Promise<void>;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType>(null as never);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [value, setValue] = useState<UserContextState>({
    user: null,
    status: UserLogInStatus.loggedIn,
  });

  const setContextValue = useCallback(
    <K extends keyof UserContextState>(
      key: K,
      action: React.SetStateAction<UserContextState[K]>
    ) => {
      setValue((prev) => {
        return {
          ...prev,
          [key]: typeof action === 'function' ? action(prev[key]) : action,
        };
      });
    },
    []
  );

  const logIn: UserContextType['logIn'] = useCallback(async (_creds) => {
    // Todo: Call to api, returns cookie in response value
    setContextValue('status', UserLogInStatus.loggedIn);
    setContextValue('user', { name: 'John Black' });
  }, [setContextValue]);

  useEffect(() => {
    // Todo: Call to api to check if token exists & is valid through provider, if so return and set user in value.
    // const { data: user } = await axios.get(`${import.meta.env.API_URL}/me`, { credentials: true })
    // setContextValue('status', UserLogInStatus.loggedIn);
    // setContextValue('user', { name: 'John Black' });
    setContextValue('status', UserLogInStatus.loggedOut);
  }, [setContextValue]);

  return (
    <GoogleOAuthProvider clientId=''>
      <UserContext.Provider
        value={{
          logIn,
          isLoading: value.status === null,
          ...value,
        }}
      >
        {children}
      </UserContext.Provider>
    </GoogleOAuthProvider>
  );
};

export const useUser = () => {
  const value = useContext(UserContext);

  if (!value)
    throw new Error('useContext hook must be used within UserContext provider');

  return value;
};
