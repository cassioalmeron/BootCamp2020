import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

const defaultUserData = {
  name: 'Cássio Almeron',
  email: 'cassioalmeron@gmail.com',
  password: '123456',
};

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create(defaultUserData);

    const profile = await showProfile.execute({ user_id: user.id });

    expect(profile.id).toBe(user.id);
    expect(profile.name).toBe(defaultUserData.name);
    expect(profile.email).toBe(defaultUserData.email);
  });

  it('should not be able to show the profile when the user id does not exists', async () => {
    await fakeUsersRepository.create(defaultUserData);

    await expect(
      showProfile.execute({ user_id: 'Inválid Id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
