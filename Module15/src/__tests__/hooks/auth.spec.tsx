import { renderHook } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from '../../hooks/auth';

describe('Auth hook', () => {
  it('shold be able to sign in', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    result.current.signIn({
      email: 'cassioalmeron@gmail.com',
      password: '123456',
    });

    expect(result.current.user.email).toEqual('cassioalmeron@gmail.com');
  });
});
