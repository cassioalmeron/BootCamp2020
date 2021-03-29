import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { EntityRepository, getRepository, Repository, Not } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    const filter: any = {};
    if (except_user_id) filter.id = Not(except_user_id);

    const users = await this.ormRepository.find({ where: filter });

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
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
