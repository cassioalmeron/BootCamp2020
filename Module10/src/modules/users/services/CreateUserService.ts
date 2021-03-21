import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
interface IRequestDto {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email, password }: IRequestDto): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashadPassword = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashadPassword,
    });

    return user;
  }
}

export default CreateUserService;
