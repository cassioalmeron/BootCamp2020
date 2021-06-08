import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import {
  AuthProvider,
  useAuth,
  localStorageTokenKey,
  localStorageUserKey,
} from '../../hooks/auth';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  it('shold be able to sign in', async () => {
    const apiResponse = {
      user: {
        id: 'user-123',
        name: 'Cássio Almeron',
        email: 'cassioalmeron@gmail.com',
      },
      token: 'token-123',
    };

    apiMock.onPost('sessions').reply(200, apiResponse);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'cassioalmeron@gmail.com',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      localStorageTokenKey,
      apiResponse.token,
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      localStorageUserKey,
      JSON.stringify(apiResponse.user),
    );
    expect(result.current.user.email).toEqual('cassioalmeron@gmail.com');
  });

  it('shold restore saved data from storage when auth inits', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case localStorageTokenKey:
          return 'token-123';
        case localStorageUserKey:
          return JSON.stringify({
            id: 'user-123',
            name: 'Cássio Almeron',
            email: 'cassioalmeron@gmail.com',
          });
        default:
          return null;
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual('cassioalmeron@gmail.com');
  });

  it('shold be able to sign out', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case localStorageTokenKey:
          return 'token-123';
        case localStorageUserKey:
          return JSON.stringify({
            id: 'user-123',
            name: 'Cássio Almeron',
            email: 'cassioalmeron@gmail.com',
          });
        default:
          return null;
      }
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(removeItemSpy).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });

  it('shold be able to update user data', async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const user = {
      id: 'user-123',
      name: 'Cássio Almeron',
      email: 'cassioalmeron@gmail.com',
      avatar_url: 'image-test.jpg',
    };

    act(() => {
      result.current.updateUser(user);
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      localStorageUserKey,
      JSON.stringify(user),
    );
    expect(result.current.user).toEqual(user);
  });
});
