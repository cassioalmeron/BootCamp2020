import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const router = Router();

router.post('/forgot', ForgotPasswordController.create);
router.post('/reset', ResetPasswordController.create);

export default router;
