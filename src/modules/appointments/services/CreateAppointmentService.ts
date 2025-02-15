import  IAppointmentsRepository  from '@modules/appointments/repositories/IAppointmentsRepository';

import {startOfHour , isBefore, getHours, format} from 'date-fns'
import {injectable,inject} from 'tsyringe'
import Appointment from '../infra/typeorm/entities/Appointment';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import ICacheProvider from '@shared/Container/providers/CacheProvider/models/ICacheProvider'


import AppError from '@shared/errors/AppError'
/* Regra de negócio
 Passos :
 - Recebimento das Informações
 - Tratativa de erros /excessões
 - Acesso ao repositório
*/


 interface IRequest {
    provider_id : string;
    date : Date;
    user_id : string;
}
@injectable()
class CreateAppointmentService {

    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository:IAppointmentsRepository,
        @inject('NotificationsRepository')
        private notificationsRepository:INotificationsRepository,
        @inject('CacheProvider')
        private CacheProvider : ICacheProvider) {

    }
    public async execute({date,provider_id, user_id }:IRequest) :Promise<Appointment> {


        const appointmentDate = startOfHour(date);

        if(isBefore(appointmentDate, Date.now())){
            throw new AppError('You can´t create an appointment on a past date')
        }

        if(user_id === provider_id){
            throw new AppError('You can´t create an appointment with yourself')
        }

        if(getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17){
            throw new AppError('You can only create appointments between 8am and 5pm !')
        }

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate, provider_id);

        if(findAppointmentInSameDate){
            throw new AppError('This appointment is already booked');
        }

        const appointment = await this.appointmentsRepository.create({provider_id, date: appointmentDate , user_id})

        const dateFormatted = format(appointmentDate , "dd/MM/yyyy 'às' HH:mm'h'")
        await this.notificationsRepository.create({
            recipient_id: provider_id,
            content : `Novo agendamento para dia ${dateFormatted}`
        })

        await this.CacheProvider.invalidate(`provider-appointments:${provider_id}:${format(
            appointmentDate,
            'yyyy-M-d')}`
            )

        return appointment;
    }
}

export default CreateAppointmentService
