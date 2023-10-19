import { IToolsRepository } from "../../../domain/interfaces/repositories";
import { IListToolsUseCase, ListToolsUseCaseResponse } from "../../../domain/interfaces/usecases/tools";
import { RedisCacheRepository } from "../../../infra/repositories/redis-cache.repository";
export class ListToolsUseCase implements IListToolsUseCase {
    constructor(
        private toolsRepository: IToolsRepository,
        private cacheRepository: RedisCacheRepository

    ) { }

    async execute(): Promise<ListToolsUseCaseResponse[]> {
        const cache = await this.cacheRepository.get('tools')

        if (cache && cache.length) {
            return JSON.parse(cache)
        }

        const listTools = await this.toolsRepository.list()
        const tools = listTools.map((tool) => {
            const tags: string[] = []
            tool.tags?.forEach(tag => {
                tags.push(tag.title)
            })
            return {
                id: tool.id,
                title: tool.title,
                link: tool.link,
                description: tool.description,
                tags
            }
        })

        await this.cacheRepository.set('tools', JSON.stringify(tools))

        return tools

    }
}