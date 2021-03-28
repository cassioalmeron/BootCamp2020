import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let listProviderDayAvailability: ListProviderDayAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderDayAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the day availability from provider', async () => {
    fakeAppointmentsRepository.create({
      provider_id: '0',
      date: new Date(2021, 2, 20, 8, 0, 0),
    });

    fakeAppointmentsRepository.create({
      provider_id: '0',
      date: new Date(2021, 2, 20, 10, 0, 0),
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: '0',
      day: 20,
      year: 2021,
      month: 3,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
  });
});
