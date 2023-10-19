import { UserEntity } from "../../domain/entities";
import { IUserRepository } from "../../domain/interfaces/repositories";
import prismaClient from "../database/prisma/prisma.client";

export class UserRepository implements IUserRepository {
    async create(name: string, email: string, password: string): Promise<UserEntity> {
        const user = await prismaClient.user.create({ data: { name, email, password } })
        return user
    }

    async list(): Promise<UserEntity[]> {
        const users = await prismaClient.user.findMany()
        return users
    }

    async deleteById(id: number): Promise<void> {
        await prismaClient.user.delete({ where: { id: id } })
    }
    async findByEmail(email: string): Promise<any> {
        const findByEmail = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })
        return findByEmail
    }
}