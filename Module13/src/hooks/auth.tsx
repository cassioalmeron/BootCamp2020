import React, { createContext, useCallback, useContext, useState } from 'react';
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
  token: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
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

  const signOut = useCallback(() => {
    localStorage.removeItem(localStorageTokenKey);
    localStorage.removeItem(localStorageUserKey);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ token: data.token, user: data.user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
}
