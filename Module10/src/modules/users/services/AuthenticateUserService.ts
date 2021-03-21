import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

interface RequestDto {
  email: string;
  password: string;
}

interface ResponseDto {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: RequestDto): Promise<ResponseDto> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({ email });

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
