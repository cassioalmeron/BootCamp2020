import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import AppError from '../errors/AppError';

interface RequestDto {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: RequestDto): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({ email });

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashadPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashadPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
