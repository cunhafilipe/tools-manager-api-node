import { LoginUseCase } from '../../application/usecases/auth/login.usecase';
import { JwtAuth } from '../../infra/auth/sign-jwt.auth';
import { UserRepository } from '../../infra/repositories';
import { LoginDto, loginSchema } from '../dtos/login.dto';

class loginController {
  public async execute({ email, password }: LoginDto) {

    loginSchema.parse({ email, password })//zod validation

    const userRepository = new UserRepository()
    const jwtAuth = new JwtAuth()
    const loginUseCase = new LoginUseCase(userRepository, jwtAuth)

    const login = await loginUseCase.execute({ email, password })

    return login
  }
}

export default new loginController();