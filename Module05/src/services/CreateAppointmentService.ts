import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDto{
  provider: string,
  date: Date
}

class CreateAppointmentService{

  constructor(appointmentsRepository: AppointmentsRepository){
    this.appointmentsRepository = appointmentsRepository;
  }

  private appointmentsRepository: AppointmentsRepository;

  public execute({date, provider}: RequestDto): Appointment {
    const parsedDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(parsedDate);

    if (findAppointmentInSameDate){
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({provider, date: parsedDate});

    return appointment;
  }
}

export default CreateAppointmentService;
