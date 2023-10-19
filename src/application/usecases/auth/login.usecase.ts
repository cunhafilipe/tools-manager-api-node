import bcrypt from 'bcrypt';
import { IUserRepository } from "../../../domain/interfaces/repositories";
import { ILoginUseCase, LoginUseCaseRequest } from '../../../domain/interfaces/usecases/user/login.usecase.interface';
import { JwtAuth } from '../../../infra/auth/sign-jwt.auth';
import { NotFoundError } from "../../../infra/errors";

export class LoginUseCase implements ILoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly jwtAuth: JwtAuth
  ) { }

  async execute({ email, password }: LoginUseCaseRequest): Promise<any> {
    const userExist = await this.userRepository.findByEmail(email);
    if (!userExist) {
      throw new NotFoundError('User not found')
    }

    const matchPassword = await bcrypt.compare(password, userExist.password)

    if (!matchPassword) {
      throw new NotFoundError('Invalid password')
    }

    const token = this.jwtAuth.sign(userExist.email, userExist.id)

    return { ...userExist, token }
  }
}