import  UpdateUserAvatarService  from '@modules/users/services/UpdateUserAvatarService';
import { classToClass } from 'class-transformer';

// index, show , create, update ,delete ( os 5 metodos que o controller possui)
import {Request,Response} from 'express'


import {container} from 'tsyringe';

export default class UserAvatarController {
    public async update(request: Request, response : Response) : Promise<Response>  {

        const updateUserAvatar = container.resolve(UpdateUserAvatarService)

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename
        });

        return response.json(classToClass(user))



    }
}
