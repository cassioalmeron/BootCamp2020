import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

class ProviderDayAvailabilityController {
  async index(request: Request, response: Response): Promise<Response> {
    const listProviderDayAvailabilityService = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const provider_id = request.user.id;
    const { day, month, year } = request.body;

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id,
      day,
      month,
      year,
    });
    return response.json(availability);
  }
}

export default new ProviderDayAvailabilityController();
