export type LoginUseCaseRequest = {
  email: string,
  password: string
}

export interface ILoginUseCase {
  execute(data: LoginUseCaseRequest): Promise<any>
}