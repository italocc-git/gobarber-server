import AuthenticateUserService  from '@modules/users/services/AuthenticateUserService';
// index, show , create, update ,delete ( os 5 metodos que o controller possui)
import {Request,Response} from 'express'
import { classToClass} from 'class-transformer'

import {container} from 'tsyringe';

export default class SessionsController {
    public async create(request: Request, response : Response) : Promise<Response>  {


        const { email, password } = request.body;

        const authenticateUser = container.resolve(AuthenticateUserService);

        const { user,token } = await authenticateUser.execute({
            email,
            password
        })


        return response.json({user: classToClass(user), token});
    }
}
