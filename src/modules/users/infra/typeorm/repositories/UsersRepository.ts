import { Not, Repository } from 'typeorm';
/* Observações: Persistencia <-> repositorio <-> Rota */
//find,create,delete,


import User from '../entities/User'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import { getRepository } from 'typeorm'
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO'

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>
    constructor() {
        this.ormRepository = getRepository(User)
    }
    public async findAllProviders({except_user_id}: IFindAllProvidersDTO): Promise<User[]> {
        let users: User[];
        if (except_user_id) {
            users = await this.ormRepository.find({
                where: {
                    id: Not(except_user_id)
                }
            })
        }
        else {
            users = await this.ormRepository.find()
        }

        return users;
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id);
        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { email }
        });

        return user;
    }

    public async create({ name, email, password }: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create({
            name,
            email,
            password
        })

        await this.ormRepository.save(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }


}
export default UsersRepository
