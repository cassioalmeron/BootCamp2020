import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersTokensRepository: FakeUserTokensRepository;
let fakeUsersRepository: FakeUsersRepository;
let resetPassword: ResetPasswordService;
let hashProvider: FakeHashProvider;

const defaultUserData = {
  name: 'Cássio Almeron',
  email: 'cassioalmeron@gmail.com',
  password: '123456',
};

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersTokensRepository = new FakeUserTokensRepository();
    fakeUsersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUsersTokensRepository,
      hashProvider,
    );
  });

  it('should be able to reset the password', async () => {
    const generateHash = jest.spyOn(hashProvider, 'generateHash');

    const user = await fakeUsersRepository.create(defaultUserData);

    const { token } = await fakeUsersTokensRepository.generate(user.id);

    await resetPassword.execute({
      token,
      password: 'ABCDEF',
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('ABCDEF');
    expect(updatedUser?.password).toBe('ABCDEF');
  });

  it('should not be able to reset the password with non-existing token', async () => {
    expect(
      resetPassword.execute({
        token: 'invalid token',
        password: 'ABCDEF',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUsersTokensRepository.generate('invalida user');

    expect(
      resetPassword.execute({
        token,
        password: 'ABCDEF',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with more than 2 hours passed', async () => {
    const user = await fakeUsersRepository.create(defaultUserData);

    const { token } = await fakeUsersTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const custemDate = new Date();
      return custemDate.setHours(custemDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        token,
        password: 'ABCDEF',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
