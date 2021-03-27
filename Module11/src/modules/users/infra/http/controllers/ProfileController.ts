import { container } from 'tsyringe';
import { Request, Response } from 'express';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

class ProfileController {
  async show(request: Request, response: Response): Promise<Response> {
    const showProfile = container.resolve(ShowProfileService);
    const user = await showProfile.execute({ user_id: request.user.id });

    delete user.password;

    return response.json(user);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const updateProfile = container.resolve(UpdateProfileService);
    const data = { user_id: request.user.id, ...request.body };
    const user = await updateProfile.execute(data);

    delete user.password;

    return response.json(user);
  }
}

export default new ProfileController();
