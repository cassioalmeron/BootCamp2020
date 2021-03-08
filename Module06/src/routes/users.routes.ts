import { Router } from 'express';
import multer from 'multer';
import ensudeAuthenticated from '../middlewares/ensudeAuthenticated';
import CreateUserService from '../services/CreateUserService';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const router = Router();
const upload = multer(uploadConfig);

router.post('/', async (request, response) => {
  const user = await createUser.execute(request.body);

  delete user.password;

  return response.status(201).json(user);
});

router.patch(
  '/avatar',
  ensudeAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default router;
