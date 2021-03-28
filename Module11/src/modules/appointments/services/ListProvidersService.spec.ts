import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

const defaultUserData = {
  name: 'Cássio Almeron',
  email: 'cassioalmeron@gmail.com',
  password: '123456',
};

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      ...defaultUserData,
      email: 'cpalmero@ucs.br',
    });

    const user2 = await fakeUsersRepository.create({
      ...defaultUserData,
      email: 'cassioalmeron@brturbo.br',
    });

    const loggedUser = await fakeUsersRepository.create(defaultUserData);

    const providers = await listProviders.execute({ user_id: loggedUser.id });

    expect(providers).toEqual([user1, user2]);
  });
});
