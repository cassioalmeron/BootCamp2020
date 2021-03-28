import { Router } from 'express';
import ensudeAuthenticated from '@modules/users/infra/http/middlewares/ensudeAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();

providersRouter.use(ensudeAuthenticated);

providersRouter.get('/', ProvidersController.index);

export default providersRouter;
