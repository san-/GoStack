import { getDate, getDaysInMonth } from 'date-fns';

import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvaliabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appoinementsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appoinementsRepository.findByProviderAndMonth(
      {
        provider_id,
        year,
        month,
      },
    );

    const numberOfDays = getDaysInMonth(new Date(year, month - 1, 1));

    const eachDayArray = Array.from(
      { length: numberOfDays },
      (_, index) => index + 1,
    );

    const avaliabitily = eachDayArray.map(day => {
      const appoinementsInDay = appointments.filter(
        appointment => getDate(appointment.date) === day,
      );

      return { day, available: appoinementsInDay.length < 10 };
    });

    return avaliabitily;
  }
}

export default ListProviderMonthAvaliabilityService;
