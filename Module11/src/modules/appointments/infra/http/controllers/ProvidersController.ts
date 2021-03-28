import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

class ProvidersController {
  async index(request: Request, response: Response): Promise<Response> {
    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({
      user_id: request.user.id,
    });
    return response.status(201).json(providers);
  }
}

export default new ProvidersController();
