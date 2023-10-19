export type FindByKeyToolsUseCaseResponse = {
  id: number
  title: string,
  link: string,
  description: string,
  tags: string[]
}

export interface IFindByKeyToolsUseCase {
  execute(
    key: string
    ): Promise<FindByKeyToolsUseCaseResponse[]>
}