import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import uploadConfig from '@config/upload';
import ensudeAuthenticated from '../middlewares/ensudeAuthenticated';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const router = Router();
const upload = multer(uploadConfig);

router.post('/', async (request, response) => {
  const usersRepository = new UsersRepository();
  const createUser = new CreateUserService(usersRepository);
  const user = await createUser.execute(request.body);

  delete user.password;

  return response.status(201).json(user);
});

router.patch(
  '/avatar',
  ensudeAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const usersRepository = new UsersRepository();
    const updateUserAvatar = new UpdateUserAvatarService(usersRepository);
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default router;
