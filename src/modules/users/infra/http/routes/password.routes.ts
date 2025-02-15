import { Router } from 'express'
import {celebrate, Segments , Joi} from 'celebrate'
import ResetPasswordController from '../controllers/ResetPasswordController';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

const passwordRouter = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

// http://localhost:3333/sessionss
passwordRouter.post('/forgot',
celebrate({
    [Segments.BODY]: {
        token: Joi.string().uuid().required()
    },
}),
 forgotPasswordController.create);

passwordRouter.post(
    '/reset',
    celebrate({
        [Segments.BODY]: {
            token: Joi.string().uuid().required(),
            password: Joi.string().required(),
            password_confirmation: Joi.string().required().valid(Joi.ref('password'))
        },
    }),
 resetPasswordController.create);


export default passwordRouter;
