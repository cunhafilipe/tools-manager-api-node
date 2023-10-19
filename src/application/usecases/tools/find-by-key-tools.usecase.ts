import { IToolsRepository } from "../../../domain/interfaces/repositories";
import { FindByKeyToolsUseCaseResponse, IFindByKeyToolsUseCase } from "../../../domain/interfaces/usecases/tools";
import { NotFoundError } from "../../../infra/errors";

export class FindByKeyToolsUseCase implements IFindByKeyToolsUseCase {
    constructor(
        private readonly toolsRepository: IToolsRepository

    ) { }
    async execute(key: string): Promise<FindByKeyToolsUseCaseResponse[]> {

        const tool = await this.toolsRepository.findByKey(key)

        if (!tool) {
            throw new NotFoundError('Not Found')
        }

        const tools = tool.map((data) => {
            const tags: string[] = []
            data.tags?.forEach((tag) => {
                tags.push(tag.title)
            })
            return {
                id: data.id,
                title: data.title,
                link: data.link,
                description: data.description,
                tags
            }

        })

        return tools
    }
}