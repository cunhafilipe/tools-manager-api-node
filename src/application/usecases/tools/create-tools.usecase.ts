import { ITagsRepository, IToolsRepository } from "../../../domain/interfaces/repositories";
import { CreateToolUseCaseRequest, CreateToolUseCaseResponse, ICreateToolsUseCase } from "../../../domain/interfaces/usecases/tools";
import { InvalidDataError } from "../../../infra/errors/invalid-data.error";
import { RedisCacheRepository } from "../../../infra/repositories/redis-cache.repository";

export class CreateToolsUseCase implements ICreateToolsUseCase {
    constructor(
        private readonly toolsRepository: IToolsRepository,
        private readonly tagsRepository: ITagsRepository,
        private readonly cacheRepository: RedisCacheRepository
    ) { }

    async execute({ title, link, description, tags }: CreateToolUseCaseRequest): Promise<CreateToolUseCaseResponse> {

        const toolsExist = await this.toolsRepository.findBy({ title })

        if (toolsExist) {
            throw new InvalidDataError('Tools already exists!')
        }

        const tool = await this.toolsRepository.create(
            title,
            link,
            description
        )

        const createdTags: string[] = []
        for (const tag of tags) {
            const createTag = await this.tagsRepository.create(tag, tool.id)
            createdTags.push(createTag.title)
        }

        await this.cacheRepository.set('tools', JSON.stringify({}))

        return { ...tool, tags: createdTags }
    }

}