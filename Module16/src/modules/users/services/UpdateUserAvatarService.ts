import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IStoragemProvider from '@shared/container/providers/StorageProvider/models/IStoragemProvider';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequestDto {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('StoragemProvider') private storagemProvider: IStoragemProvider,
  ) {}

  public async execute({
    user_id,
    avatarFilename,
  }: IRequestDto): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user)
      throw new AppError('Only authenticated users can change avatar.', 401);

    if (user.avatar) {
      await this.storagemProvider.deleteFile(user.avatar);
    }

    const filename = await this.storagemProvider.saveFile(avatarFilename);

    user.avatar = filename;
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
