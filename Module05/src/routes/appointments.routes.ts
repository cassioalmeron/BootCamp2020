import { parseISO } from 'date-fns';
import { Router } from 'express';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
})

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const appointmentDate = parseISO(date);

  const createAppointment = new CreateAppointmentService(appointmentsRepository);

  try{
    const appointment = createAppointment.execute({provider, date: appointmentDate});
    return response.status(201).json(appointment)
  }
  catch (err){
    return response.status(400).json({error: err.message})
  }
})

export default appointmentsRouter;
