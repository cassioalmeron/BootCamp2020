import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

class ProviderAppointmentsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, day, month, year } = request.body;

    const createAppointment = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointment = await createAppointment.execute({
      provider_id,
      day,
      month,
      year,
    });
    return response.json(appointment);
  }
}

export default new ProviderAppointmentsController();
