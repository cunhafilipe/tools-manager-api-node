import { IToolsRepository } from "../../../domain/interfaces/repositories";
import { IDeleteToolsUseCase } from "../../../domain/interfaces/usecases/tools";
import { NotFoundError } from "../../../infra/errors";
import { RedisCacheRepository } from "../../../infra/repositories/redis-cache.repository";

export class DeleteToolsUseCase implements IDeleteToolsUseCase {
    constructor(
        private readonly toolsRepository: IToolsRepository,
        private readonly cacheRepository: RedisCacheRepository

    ) { }

    async execute(id: number): Promise<void> {
        const toolsExist = await this.toolsRepository.findBy({ id })
        if (!toolsExist) {
            throw new NotFoundError('tools not found')
        }
        await this.toolsRepository.deleteById(id)

        await this.cacheRepository.set('tools', JSON.stringify({}))
    }
}