import { CreateUserUseCase } from "../../../../src/application/usecases/user/create-user.usecase";
import { ICreateUserUseCase } from "../../../../src/domain/interfaces/usecases/user/create-user.usecase.interface";
import { InvalidDataError } from "../../../../src/infra/errors";

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockReturnValue('hash-here'),
}))

describe('app :: usecases :: user :: create-user', () => {
  let createUserUseCase: ICreateUserUseCase

  const userRepositoryMock = {
    findByEmail: jest.fn().mockReturnValue(null),
    create: jest.fn().mockReturnValue({})
  } as any

  const jwt = {
    sign: jest.fn().mockReturnValue('token-here'),
  }

  beforeEach(() => {
    createUserUseCase = new CreateUserUseCase(userRepositoryMock, jwt)
  })
  it('should create a new user', async () => {
    await createUserUseCase.execute(
      {
        email: 'user-email-here',
        name: 'user-name-here',
        password: 'user-password-here'
      }
    )

    expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith('user-email-here')
    expect(userRepositoryMock.create).toHaveBeenCalledWith("user-name-here", "user-email-here", "hash-here")
  })
  it('should throw error if user already exists', async () => {
    jest.spyOn(userRepositoryMock, 'findByEmail').mockReturnValue({
      id: 1,
      name: 'name-here',
      email: 'email-here',
      password: 'password-here'
    })

    try {
      const response = await createUserUseCase.execute(
        {
          email: 'user-email-here',
          name: 'email-here',
          password: 'user-password-here'
        }
      )
      expect(response).toBeFalsy()
    } catch (error) {
      expect(error instanceof InvalidDataError).toBeTruthy()
      expect((error as InvalidDataError).message).toBe('User already exists!')
    }
  })
})