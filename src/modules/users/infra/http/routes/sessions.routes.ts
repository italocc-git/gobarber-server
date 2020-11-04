import { Router } from 'express'
import {celebrate, Segments , Joi} from 'celebrate'
import SessionsController from '../controllers/SessionsController'
const sessionssRouter = Router();

const sessionsController = new SessionsController();

// http://localhost:3333/sessionss
sessionssRouter.post('/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password : Joi.string().required()
        }
    })
, sessionsController.create);


export default sessionssRouter;
