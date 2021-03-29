import { Router } from 'express';
import ensudeAuthenticated from '@modules/users/infra/http/middlewares/ensudeAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providersRouter = Router();

providersRouter.use(ensudeAuthenticated);

providersRouter.get('/', ProvidersController.index);

providersRouter.get(
  '/:provider_id/month-availability',
  ProviderMonthAvailabilityController.index,
);

providersRouter.get(
  '/:provider_id/day-availability',
  ProviderDayAvailabilityController.index,
);

export default providersRouter;
