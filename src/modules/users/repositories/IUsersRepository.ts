import User from '../infra/typeorm/entities/User'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO'
export default interface IUsersRepository {
    findById(id:string): Promise<User | undefined>
    findByEmail(email: string ) : Promise<User | undefined>
    create(data : ICreateUserDTO): Promise<User>
    save(user: User) : Promise<User>
    findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>
}
