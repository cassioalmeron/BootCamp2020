import { renderHook } from '@testing-library/react-hooks';
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
});
