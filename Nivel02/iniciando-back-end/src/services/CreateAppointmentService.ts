import { startOfHour } from 'date-fns';
import Appoinment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepositoty: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepositoty;
  }

  public execute({ provider, date }: Request): Appoinment {
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });
    return appointment;
  }
}

export default CreateAppointmentService;
