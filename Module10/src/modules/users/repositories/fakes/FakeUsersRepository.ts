import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { uuid } from 'uuidv4';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  public async create(data: ICreateUsersDTO): Promise<User> {
    const user = new User();

    Object.assign(
      user,
      {
        id: uuid(),
      },
      data,
    );

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const index = this.users.findIndex(item => item.id === user.id);

    this.users[index] = user;

    return user;
  }
}

export default FakeUsersRepository;
