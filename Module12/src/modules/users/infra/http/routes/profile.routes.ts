import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ensudeAuthenticated from '../middlewares/ensudeAuthenticated';
import ProfileController from '../controllers/ProfileController';

const router = Router();

router.use(ensudeAuthenticated);
router.get('/', ProfileController.show);
router.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  ProfileController.update,
);

export default router;
