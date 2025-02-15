
// index, show , create, update ,delete ( os 5 metodos que o controller possui)
import {Request,Response} from 'express'
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService'

import {container} from 'tsyringe';

export default class ForgotPasswordController {
    public async create(request: Request, response : Response) : Promise<Response>  {


        const { email } = request.body;

        const sendForgotPasswordEmail = container.resolve(SendForgotPasswordEmailService);

        await sendForgotPasswordEmail.execute({
            email,
        })


        return response.status(204).json();
    }
}
