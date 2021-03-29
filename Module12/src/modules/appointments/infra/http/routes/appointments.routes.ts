import { Router } from 'express';
import ensudeAuthenticated from '@modules/users/infra/http/middlewares/ensudeAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();

appointmentsRouter.use(ensudeAuthenticated);

appointmentsRouter.post('/', AppointmentsController.create);

appointmentsRouter.get('/me', ProviderAppointmentsController.create);

export default appointmentsRouter;
