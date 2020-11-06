import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (_request, response) => {
  return response.json(appointmentRepository.all());
});

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;
  try {
    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService(
      appointmentRepository,
    );

    const appointment = createAppointmentService.execute({
      date: parsedDate,
      provider,
    });

    return response.json(appointment);
  } catch (e) {
    return response.status(400).json({ error: e.message });
  }
});

export default appointmentsRouter;
