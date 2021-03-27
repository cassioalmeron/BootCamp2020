import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequestDto {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
  ) {}

  public async execute(data: IRequestDto): Promise<User> {
    const user = await this.usersRepository.findById(data.user_id);

    if (!user) throw new AppError('User not found');

    const existingEmail = await this.usersRepository.findByEmail(data.email);
    if (existingEmail && existingEmail.id != data.user_id)
      throw new AppError(`The email ${data.email} already exists!`);

    const dataToSave = { ...data };
    delete dataToSave.password;
    delete dataToSave.old_password;

    if (data.password) {
      if (!data.old_password)
        throw new AppError('The old password is required!');

      const hashMatch = await this.hashProvider.compareHash(
        data.old_password,
        user.password,
      );
      if (!hashMatch) throw new AppError('The old password is inválid!');
      user.password = await this.hashProvider.generateHash(data.password);
    }

    Object.assign(user, dataToSave);

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
