import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDto {
  provider_id: string;
  day: number;
  month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('CacheProvider') private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequestDto): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;

    let appointments = await this.cacheProvider.recover<Appointment[]>(
      cacheKey,
    );

    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDayFromProvider(
        { day, month, year, provider_id },
      );

      this.cacheProvider.save(cacheKey, appointments);
    }

    return appointments;
  }
}

export default ListProviderAppointmentsService;
