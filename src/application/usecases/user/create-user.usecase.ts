import bcrypt from 'bcrypt';
import { IUserRepository } from "../../../domain/interfaces/repositories";
import { CreateUSerUseCaseRequest, ICreateUserUseCase } from "../../../domain/interfaces/usecases/user/create-user.usecase.interface";
import { JwtAuth } from '../../../infra/auth/sign-jwt.auth';
import { InvalidDataError } from '../../../infra/errors';


export class CreateUserUseCase implements ICreateUserUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly jwtAuth: JwtAuth,
    ) { }
    async execute({ name, email, password }: CreateUSerUseCaseRequest): Promise<any> {
        const userExist = await this.userRepository.findByEmail(email)
        if (userExist) {
            throw new InvalidDataError('User already exists!')
        }

        const hashPassword = await bcrypt.hash(password, 12)

        const createUser = await this.userRepository.create(
            name,
            email,
            hashPassword
        )

        const token = this.jwtAuth.sign(
            createUser.email,
            createUser.id
        )

        return { createUser, token }
    }
}