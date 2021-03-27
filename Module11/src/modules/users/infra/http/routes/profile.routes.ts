import { Router } from 'express';
import ensudeAuthenticated from '../middlewares/ensudeAuthenticated';
import ProfileController from '../controllers/ProfileController';

const router = Router();

router.use(ensudeAuthenticated);
router.get('/', ProfileController.show);
router.put('/', ProfileController.update);

export default router;
