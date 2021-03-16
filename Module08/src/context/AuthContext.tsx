import React, { createContext, useCallback, useState } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: any;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: any;
  signIn(credentials: SignInCredentials): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const localStorageTokenKey = '@GoBarber:token';
const localStorageUserKey = '@GoBarber:user';

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem(localStorageTokenKey);
    const userJson = localStorage.getItem(localStorageUserKey);

    let user = {};
    if (userJson) user = JSON.parse(userJson);

    return { token, user } as AuthState;
  });

  const signIn = useCallback(
    async ({ email, password }: SignInCredentials): Promise<void> => {
      const response = await api.post('sessions', { email, password });

      const { token, user } = response.data;
      localStorage.setItem(localStorageTokenKey, token);
      localStorage.setItem(localStorageUserKey, JSON.stringify(user));

      setData({ user, token });
    },
    [],
  );

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
