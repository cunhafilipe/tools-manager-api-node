export type CreateToolUseCaseRequest = {
    title: string,
    link: string,
    description: string,
    tags: string[]
}
export type CreateToolUseCaseResponse = {
    id: number
    title: string,
    link: string,
    description: string,
    tags: string[]
}

export interface ICreateToolsUseCase {
    execute(
            data: CreateToolUseCaseRequest
        ): Promise<CreateToolUseCaseResponse>
}