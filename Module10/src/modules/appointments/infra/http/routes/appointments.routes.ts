import { parseISO } from 'date-fns';
import { Router } from 'express';
import { container } from 'tsyringe';
import ensudeAuthenticated from '@modules/users/infra/http/middlewares/ensudeAuthenticated';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.use(ensudeAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const appointmentDate = parseISO(date);

  const createAppointment = container.resolve(CreateAppointmentService);

  const appointment = await createAppointment.execute({
    provider_id,
    date: appointmentDate,
  });
  return response.status(201).json(appointment);
});

export default appointmentsRouter;
