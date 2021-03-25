import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

const fakeMailProvider = new FakeMailProvider();

describe('SendForgotPasswordEmailService', () => {
  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const fakeUsersRepository = new FakeUsersRepository();
    fakeUsersRepository.create({
      name: 'Cássio Almeron',
      email: 'cassioalmeron@gmail.com',
      password: '123456',
    });

    const service = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    await service.execute({
      email: 'cassioalmeron@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
