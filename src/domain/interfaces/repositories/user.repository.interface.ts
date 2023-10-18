import { UserEntity } from "../../entities";

export interface IUserRepository {
    create(
        name: string,
        email: string,
        password: string,
    ): Promise<UserEntity>
    list(): Promise<UserEntity[]>
    deleteById(id: number): Promise<void>
    findByEmail(email:string):any
}