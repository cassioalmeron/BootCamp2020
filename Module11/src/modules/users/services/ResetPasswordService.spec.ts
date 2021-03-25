import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersTokensRepository: FakeUserTokensRepository;
let fakeUsersRepository: FakeUsersRepository;
let resetPassword: ResetPasswordService;
let hashProvider: FakeHashProvider;

describe('SendForgotPasswordEmailService', () => {
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
    const user = await fakeUsersRepository.create({
      name: 'Cássio Almeron',
      email: 'cassioalmeron@gmail.com',
      password: '123456',
    });

    const { token } = await fakeUsersTokensRepository.generate(user.id);

    await resetPassword.execute({
      token,
      password: 'ABCDEF',
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser?.password).toBe('ABCDEF');
  });
});
