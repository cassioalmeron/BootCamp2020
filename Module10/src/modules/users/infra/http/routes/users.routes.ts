import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensudeAuthenticated from '../middlewares/ensudeAuthenticated';
import UsersControllers from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const router = Router();
const upload = multer(uploadConfig);

router.post('/', UsersControllers.create);

router.patch(
  '/avatar',
  ensudeAuthenticated,
  upload.single('avatar'),
  UserAvatarController.update,
);

export default router;
