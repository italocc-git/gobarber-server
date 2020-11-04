import  CreateUserService  from '@modules/users/services/CreateUserService';
import { classToClass } from 'class-transformer';

// index, show , create, update ,delete ( os 5 metodos que o controller possui)
import {Request,Response} from 'express'


import {container} from 'tsyringe';

export default class UsersController {
    public async create(request: Request, response : Response) : Promise<Response>  {

        const { name, email, password } = request.body;

        const createUser = container.resolve(CreateUserService)

        const user = await createUser.execute({
            name,
            email,
            password
        })


        return response.json(classToClass(user));

    }
}
