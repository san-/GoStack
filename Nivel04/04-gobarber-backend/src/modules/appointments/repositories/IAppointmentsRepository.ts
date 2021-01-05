import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindByProviderAndDateDTO from '../dtos/IFindByProviderAndDateDTO';
import IFindByProviderAndMonthDTO from '../dtos/IFindByProviderAndMonthDTO';
import Appointment from '../infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findByProviderAndMonth(
    data: IFindByProviderAndMonthDTO,
  ): Promise<Appointment[]>;
  findByProviderAndDate(
    data: IFindByProviderAndDateDTO,
  ): Promise<Appointment[]>;
}
