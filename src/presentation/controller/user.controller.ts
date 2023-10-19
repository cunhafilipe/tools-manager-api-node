import { CreateUserUseCase } from '../../application/usecases/user/create-user.usecase';
import { JwtAuth } from '../../infra/auth/sign-jwt.auth';
import { UserRepository } from '../../infra/repositories';
import { CreateUserDto, createUserSchema } from '../dtos/user.dto';

class UserController {
  public async create({ name, email, password }: CreateUserDto) {

    createUserSchema.parse({ name, email, password }); //zod validation

    const userRepository = new UserRepository()
    const jwtAuth = new JwtAuth()
    const createUserUseCase = new CreateUserUseCase(userRepository, jwtAuth)

    const userCreate = await createUserUseCase.execute({ name, email, password })

    return userCreate
  }
}

export default new UserController();