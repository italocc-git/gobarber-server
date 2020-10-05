import {startOfHour} from 'date-fns'
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError'
/* Regra de negócio
 Passos :
 - Recebimento das Informações
 - Tratativa de erros /excessões
 - Acesso ao repositório
*/


 interface Request {
    provider_id : string;
    date : Date;
}

class CreateAppointmentService {


    public async execute({date,provider_id}:Request) :Promise<Appointment> {

        const appointmentsRepository = getCustomRepository(AppointmentsRepository)
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

        if(findAppointmentInSameDate){
            throw new AppError('This appointment is already booked');
        }

        const appointment = appointmentsRepository.create({provider_id, date: appointmentDate})

        appointmentsRepository.save(appointment)

        return appointment;
    }
}

export default CreateAppointmentService
