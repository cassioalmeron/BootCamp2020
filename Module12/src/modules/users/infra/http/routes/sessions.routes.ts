import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

const router = Router();

router.post('/', SessionsController.create);

export default router;
