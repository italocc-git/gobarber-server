import { Repository, Raw } from 'typeorm';
/* Observações: Persistencia <-> repositorio <-> Rota */
//find,create,delete,


import Appointment from '../entities/Appointment'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import {getRepository} from 'typeorm'

import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProvider'

class AppointmentsRepository  implements IAppointmentsRepository {
    private ormRepository : Repository<Appointment>
    constructor() {
        this.ormRepository = getRepository(Appointment)
    }

    public async findByDate(date : Date) :Promise<Appointment | undefined> {

        const findAppointment = await this.ormRepository.findOne({
            where : { date : date}
        })
        return findAppointment ;
    }

    public async findAllInMonthFromProvider({provider_id,month,year} :IFindAllInMonthFromProviderDTO)
    :Promise<Appointment[]> {

        const parsedMonth = String(month).padStart(2, '0');
        const appointments = await this.ormRepository.find({
            where : {
                provider_id,
                date : Raw(
                    dateFieldName =>
                    `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
                )
            }
        })
        return appointments
    }

    public async findAllInDayFromProvider({provider_id,day,month,year} :IFindAllInDayFromProviderDTO)
    :Promise<Appointment[]> {

        const parsedDay = String(day).padStart(2, '0');
        const parsedMonth = String(month).padStart(2, '0');
        const appointments = await this.ormRepository.find({
            where : {
                provider_id,
                date : Raw(
                    dateFieldName =>
                    `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
                )
            }
        })
        return appointments
    }


    public async create({provider_id,date , user_id}:ICreateAppointmentDTO): Promise<Appointment>{
        const appointment = this.ormRepository.create({ provider_id,date , user_id})

        await this.ormRepository.save(appointment);

        return appointment;
    }


}
export default AppointmentsRepository
