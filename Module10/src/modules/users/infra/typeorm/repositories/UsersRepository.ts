import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne(id);
  }

  findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ email });
  }

  public async create(data: ICreateUsersDTO): Promise<User> {
    const user = this.ormRepository.create(data);
    await this.ormRepository.save(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
