import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let updateProfile: UpdateProfileService;
let hashProvider: FakeHashProvider;

const defaultUserData = {
  name: 'Cássio Almeron',
  email: 'cassioalmeron@gmail.com',
  password: '123456',
};

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(fakeUsersRepository, hashProvider);
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create(defaultUserData);

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Cassio Pinheiro Almeron',
      email: 'cassioalmeron@brturbo.com',
    });

    expect(updatedUser.name).toBe('Cassio Pinheiro Almeron');
    expect(updatedUser.email).toBe('cassioalmeron@brturbo.com');
  });

  it('should not be able to update the profile when the user id does not exists', async () => {
    await fakeUsersRepository.create(defaultUserData);

    await expect(
      updateProfile.execute({ user_id: 'Inválid Id', ...defaultUserData }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to change to another existing email', async () => {
    const user = await fakeUsersRepository.create(defaultUserData);
    await fakeUsersRepository.create({
      ...defaultUserData,
      email: 'cpalmero@ucs.br',
    });

    const dataToUpdate = {
      ...user,
      user_id: user.id,
      email: 'cpalmero@ucs.br',
    };

    await expect(updateProfile.execute(dataToUpdate)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should be able to update the password', async () => {
    const generateHash = jest.spyOn(hashProvider, 'generateHash');

    const user = await fakeUsersRepository.create(defaultUserData);

    const dataToUpdate = {
      ...user,
      user_id: user.id,
      password: 'ABCDEF',
      old_password: '123456',
    };

    const updatedUser = await updateProfile.execute(dataToUpdate);

    expect(updatedUser.password).toBe('ABCDEF');
    expect(generateHash).toHaveBeenCalledWith('ABCDEF');
  });

  it('should not be able to update the password when the old password is different', async () => {
    const compareHash = jest.spyOn(hashProvider, 'compareHash');

    const user = await fakeUsersRepository.create(defaultUserData);

    const dataToUpdate = {
      ...user,
      user_id: user.id,
      password: 'ABCDEF',
      old_password: 'wrong-password',
    };

    await expect(updateProfile.execute(dataToUpdate)).rejects.toBeInstanceOf(
      AppError,
    );
    expect(compareHash).toHaveBeenCalledWith('wrong-password', user.password);
  });

  it('should not be able to update the password when the old password does not been informated', async () => {
    const generateHash = jest.spyOn(hashProvider, 'compareHash');

    const user = await fakeUsersRepository.create(defaultUserData);

    const dataToUpdate = {
      ...user,
      user_id: user.id,
      password: 'ABCDEF',
    };

    await expect(updateProfile.execute(dataToUpdate)).rejects.toBeInstanceOf(
      AppError,
    );
    expect(generateHash).toBeCalledTimes(0);
  });
});
