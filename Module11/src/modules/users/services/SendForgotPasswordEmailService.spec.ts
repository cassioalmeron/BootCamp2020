import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

const fakeMailProvider = new FakeMailProvider();

let fakeUsersTokensRepository: FakeUserTokensRepository;
let fakeUsersRepository: FakeUsersRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

const defaultUserData = {
  name: 'Cássio Almeron',
  email: 'cassioalmeron@gmail.com',
  password: '123456',
};

describe('SendForgotPasswordEmailService', () => {
  beforeEach(() => {
    fakeUsersTokensRepository = new FakeUserTokensRepository();
    fakeUsersRepository = new FakeUsersRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeUsersTokensRepository,
      fakeMailProvider,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    fakeUsersRepository.create(defaultUserData);

    await sendForgotPasswordEmail.execute({
      email: 'cassioalmeron@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should be not able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'cassioalmeron@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUsersTokensRepository, 'generate');

    const user = await fakeUsersRepository.create(defaultUserData);

    await sendForgotPasswordEmail.execute({
      email: 'cassioalmeron@gmail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
