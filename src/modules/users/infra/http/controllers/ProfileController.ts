import  UpdateProfileService  from '@modules/users/services/UpdateProfileService';
// index, show , create, update ,delete ( os 5 metodos que o controller possui)
import {Request,Response} from 'express'
import ShowProfileService from '@modules/users/services/ShowProfileService'
import {container} from 'tsyringe';
import {classToClass} from 'class-transformer'
export default class ProfileController {
    public async show(request:Request, response:Response):Promise<Response>{
            //perfil exibition

        const user_id = request.user.id;

        const showProfile = container.resolve(ShowProfileService);

        const user = await showProfile.execute({user_id})



        return response.json(classToClass(user))
    }

    public async update(request: Request, response : Response) : Promise<Response>  {


        const user_id = request.user.id;
        const { name, email, password, old_password } = request.body;

        const updateProfile = container.resolve(UpdateProfileService)

        const user = await updateProfile.execute({
            user_id,
            name,
            email,
            old_password,
            password
        })

        return response.json(classToClass(user));

    }
}
