import { format, getHours, isBefore, startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDto {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificatiosRepository: INotificationsRepository,
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequestDto): Promise<Appointment> {
    const parsedDate = startOfHour(date);

    if (isBefore(parsedDate, Date.now()))
      throw new AppError('Cannot create an appointment on a past date!');

    if (provider_id === user_id)
      throw new AppError('Cannot create an appointment to yourself!');

    const hour = getHours(parsedDate);
    if (hour < 8 || hour > 17)
      throw new AppError(
        'Can create an appointment only between 8A.M and 5P.M.!',
      );

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      parsedDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: parsedDate,
    });

    const dateFormatted = format(date, "dd/MM/yyyy 'às' HH:mm");

    await this.notificatiosRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${dateFormatted}`,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
