import {Request,Response} from 'express'
import {parseISO } from 'date-fns'

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'
import {container} from 'tsyringe';
export default class AppointmentController {

    public async create(request : Request,response : Response): Promise<Response> {
        const user_id = request.user.id

        const { provider_id, date } = request.body;


        const createAppointment = container.resolve(CreateAppointmentService);

        const appointment = await createAppointment.execute({date ,
            provider_id ,
            user_id : user_id})

        return response.json(appointment);

    }
}
