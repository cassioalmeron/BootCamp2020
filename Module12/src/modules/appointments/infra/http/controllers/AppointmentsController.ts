import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

class AppointmentsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;
    const user_id = request.user.id;

    const appointmentDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      provider_id,
      user_id,
      date: appointmentDate,
    });
    return response.status(201).json(appointment);
  }
}

export default new AppointmentsController();
