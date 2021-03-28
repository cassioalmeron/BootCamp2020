import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let listProviderMonthAvailability: ListProviderMonthAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    fakeAppointmentsRepository.create({
      provider_id: '0',
      date: new Date(2021, 1, 28, 8, 0, 0),
    });

    fakeAppointmentsRepository.create({
      provider_id: '0',
      date: new Date(2021, 2, 28, 8, 0, 0),
    });

    fakeAppointmentsRepository.create({
      provider_id: '0',
      date: new Date(2021, 2, 28, 10, 0, 0),
    });

    fakeAppointmentsRepository.create({
      provider_id: '0',
      date: new Date(2021, 2, 29, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: '0',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: false },
        { day: 22, available: true },
      ]),
    );
  });
});
