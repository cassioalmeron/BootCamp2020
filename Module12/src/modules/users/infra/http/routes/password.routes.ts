import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const router = Router();

router.post(
  '/forgot',
  celebrate({ [Segments.BODY]: { email: Joi.string().email().required() } }),
  ForgotPasswordController.create,
);
router.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  ResetPasswordController.create,
);

export default router;
