import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensudeAuthenticated from '../middlewares/ensudeAuthenticated';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const router = Router();
const upload = multer(uploadConfig);

router.post('/', UsersController.create);

router.patch(
  '/avatar',
  ensudeAuthenticated,
  upload.single('avatar'),
  UserAvatarController.update,
);

export default router;
