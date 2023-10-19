export interface IDeleteToolsUseCase {
  execute(id: number): Promise<void>
}