import { Router } from 'express';
import ensudeAuthenticated from '@modules/users/infra/http/middlewares/ensudeAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providersRouter = Router();

providersRouter.use(ensudeAuthenticated);

providersRouter.get('/', ProvidersController.index);

const validation = celebrate({
  [Segments.PARAMS]: { provider_id: Joi.string().uuid().required() },
});

providersRouter.get(
  '/:provider_id/month-availability',
  validation,
  ProviderMonthAvailabilityController.index,
);

providersRouter.get(
  '/:provider_id/day-availability',
  validation,
  ProviderDayAvailabilityController.index,
);

export default providersRouter;
