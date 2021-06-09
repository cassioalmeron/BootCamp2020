import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import { classToClass } from 'class-transformer';

class ProviderAppointmentsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.query;

    const createAppointment = container.resolve(
      ListProviderAppointmentsService,
    );

    const appointment = await createAppointment.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });
    return response.json(appointment);
  }
}

export default new ProviderAppointmentsController();
