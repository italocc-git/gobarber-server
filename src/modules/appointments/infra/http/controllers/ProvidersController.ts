import {Request,Response} from 'express'

import ListProviderService from '@modules/appointments/services/ListProviderService'
import {container} from 'tsyringe';

export default class ProvidersController {

    public async index(request : Request,response : Response): Promise<Response> {
        const user_id = request.user.id

        const listProviders = container.resolve(ListProviderService);

        const providers = await listProviders.execute({
            user_id
        })

        return response.json(providers);



    }
}
