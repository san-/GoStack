import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { parseISO } from 'date-fns';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;
    const parsedDate = parseISO(date);
    const createAppointmentService = container.resolve(
      CreateAppointmentService,
    );

    const appointment = await createAppointmentService.execute({
      date: parsedDate,
      user_id: request.user.id,
      provider_id,
    });

    return response.json(appointment);
  }
}
