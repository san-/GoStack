import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123');
  });

  it('should not be able to create two appoinments on the same time', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(2020, 4, 10, 11),
      provider_id: '123',
    });

    await expect(
      createAppointmentService.execute({
        date: appointment.date,
        provider_id: '124',
      }),
    ).rejects.toBeInstanceOf(AppError);
    // expect(appointment).toHaveProperty('id');
    // expect(appointment.provider_id).toBe('123');
  });
});
