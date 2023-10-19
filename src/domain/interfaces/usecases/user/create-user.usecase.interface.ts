export type CreateUSerUseCaseRequest = {
  name:string,
  email: string,
  password: string
}
export interface ICreateUserUseCase { 
  execute(
data: CreateUSerUseCaseRequest
): Promise<any>
}