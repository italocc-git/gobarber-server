import {injectable, inject} from 'tsyringe'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
import {getHours, isAfter} from 'date-fns'
/* import AppError from '@shared/errors/AppError'

import User from '@modules/users/infra/typeorm/entities/User'
 */
interface IRequest {
    provider_id : string;
    day : number;
    month: number;
    year:number;

}
type IResponse = Array<{
    hour: number;
    available : boolean;
}>

@injectable()
class ListProviderDayAvailability {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository : IAppointmentsRepository
    ){}

    public async execute({provider_id, year , month, day}: IRequest): Promise<IResponse> {

        const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
            provider_id,
            year,
            month,
            day
        })
        const hourStart = 8;

        const eachHourArray = Array.from(
            {length : 10},
            (_, index) => index + hourStart
        )

        const currentDate = new Date(Date.now());

        const availability = eachHourArray.map( hour => {

            const hasAppointmentInHour = appointments.find( appointment => getHours(appointment.date) === hour)


            const compareDate = new Date(year,month -1 , day, hour);   // example : 2020-05-20  08:00:00



            return {
                hour,
                available: !hasAppointmentInHour && isAfter(compareDate, currentDate)
            }
        })



        return availability
    }
}
export default ListProviderDayAvailability
