import 'reflect-metadata';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentRepository,
    );
  });

  it('should be able to list the provider month Availability', async () => {
    fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 3, 20, 8, 0, 0),
    });

    // eslint-disable-next-line no-plusplus
    for (let h = 8; h <= 17; h++) {
      fakeAppointmentRepository.create({
        provider_id: 'user',
        date: new Date(2020, 4, 20, h, 0, 0),
      });
    }

    fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });
    const Availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
    });

    expect(Availability).toBeInstanceOf(Array);
    expect(Availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
