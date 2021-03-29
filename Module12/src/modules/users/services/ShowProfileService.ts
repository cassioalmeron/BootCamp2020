import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequestDto {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute(data: IRequestDto): Promise<User> {
    const user = await this.usersRepository.findById(data.user_id);

    if (!user) throw new AppError('User not found');

    return user;
  }
}

export default ShowProfileService;
