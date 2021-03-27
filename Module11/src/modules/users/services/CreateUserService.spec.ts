import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

const fakeHashProvider = new FakeHashProvider();
let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;

const defaultUserData = {
  name: 'Cássio Almeron',
  email: 'cassioalmeron@gmail.com',
  password: '123456',
};

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute(defaultUserData);

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email', async () => {
    await createUser.execute(defaultUserData);

    await expect(createUser.execute(defaultUserData)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
