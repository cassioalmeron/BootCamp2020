import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
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
    const user = localStorage.getItem(localStorageUserKey);

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) } as AuthState;
    }

    return {} as AuthState;
  });

  const signIn = useCallback(
    async ({ email, password }: SignInCredentials): Promise<void> => {
      const response = await api.post('sessions', { email, password });

      const { token, user } = response.data;
      localStorage.setItem(localStorageTokenKey, token);
      localStorage.setItem(localStorageUserKey, JSON.stringify(user));

      api.defaults.headers.authorization = `Bearer ${token}`;

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
