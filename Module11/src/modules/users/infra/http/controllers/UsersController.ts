import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';

class UsersControllers {
  async create(request: Request, response: Response): Promise<Response> {
    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute(request.body);

    delete user.password;

    return response.status(201).json(user);
  }
}

export default new UsersControllers();
