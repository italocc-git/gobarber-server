import { Router } from 'express'
import {celebrate, Segments , Joi} from 'celebrate'
import multer from 'multer';
import uploadConfig from '@config/upload'
import UserAvatarController from '../controllers/UserAvatarController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import UsersController from '../controllers/UsersController'



const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig.multer)
const usersController = new UsersController();
const usersRouter = Router();

// http://localhost:3333/users

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY] : {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    })
    , usersController.create)

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update)

export default usersRouter;
