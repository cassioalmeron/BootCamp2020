import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequestDto {
  email: string;
  password: string;
}

interface IResponseDto {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    email,
    password,
  }: IRequestDto): Promise<IResponseDto> {
    const user = await this.usersRepository.findByEmail(email);

    const errorMessage = 'Incorrect email/password combination';

    if (!user) throw new AppError(errorMessage, 401);

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) throw new AppError(errorMessage, 401);

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
