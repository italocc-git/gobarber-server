import Appointment from '../infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProvider'
export default interface IAppointmentsRepository {
    create(date : ICreateAppointmentDTO): Promise<Appointment>
    findByDate(date : Date, provider_id : string):Promise<Appointment | undefined>;
    findAllInMonthFromProvider(data : IFindAllInMonthFromProviderDTO): Promise<Appointment[]>;
    findAllInDayFromProvider(data : IFindAllInDayFromProviderDTO): Promise<Appointment[]>

}
