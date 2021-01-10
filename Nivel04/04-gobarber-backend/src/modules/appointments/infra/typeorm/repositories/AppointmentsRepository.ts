import { getRepository, Raw, Repository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindByProviderAndMonthDTO from '@modules/appointments/dtos/IFindByProviderAndMonthDTO';
import IFindByProviderAndDateDTO from '@modules/appointments/dtos/IFindByProviderAndDateDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByProviderAndMonth({
    provider_id,
    year,
    month,
  }: IFindByProviderAndMonthDTO): Promise<Appointment[]> {
    const parsedMonth = String(month)
      .padStart(2, '0')
      .concat('-')
      .concat(String(year));
    console.log(parsedMonth);
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}'`,
        ),
      },
    });

    return appointments;
  }

  public async findByProviderAndDate({
    provider_id,
    day,
    month,
    year,
  }: IFindByProviderAndDateDTO): Promise<Appointment[]> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDate = `${parsedDay}-${parsedMonth}-${year}`;
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDate}'`,
        ),
      },
    });

    return appointments;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      user_id,
      date,
    });
    await this.ormRepository.save(appointment);
    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });
    return findAppointment;
  }
}

export default AppointmentsRepository;
