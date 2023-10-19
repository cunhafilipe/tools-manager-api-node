import { CreateToolsUseCase } from '../../application/usecases/tools/create-tools.usecase';
import { DeleteToolsUseCase } from '../../application/usecases/tools/delete-tools.usecase';
import { FindByKeyToolsUseCase } from '../../application/usecases/tools/find-by-key-tools.usecase';
import { ListToolsUseCase } from '../../application/usecases/tools/list-tools.usecase';
import { TagsRepository, ToolsRepository } from '../../infra/repositories';
import { RedisCacheRepository } from '../../infra/repositories/redis-cache.repository';
import { CreateToolDto, createToolSchema } from '../dtos/tools.dto';

class ToolsController {
  public async create(params: CreateToolDto): Promise<{
    title: string,
    link: string,
    description: string,
    tags: string[]
  }> {

    createToolSchema.parse(params);//zod validation

    const toolsRepository = new ToolsRepository()
    const tagsRepository = new TagsRepository()
    const redisRepository = new RedisCacheRepository()
    const createTagsUseCase = new CreateToolsUseCase(toolsRepository, tagsRepository, redisRepository)

    const createTags = await createTagsUseCase.execute(params)

    return createTags
  }
  public async list(): Promise<any> {
    const cacheRepository = new RedisCacheRepository()
    const toolsRepository = new ToolsRepository()
    const lisToolsByKey = new ListToolsUseCase(toolsRepository, cacheRepository)

    const list = await lisToolsByKey.execute()

    return list
  }

  public async searching(key: string) {
    const toolsRepository = new ToolsRepository()
    const findToolsByKey = new FindByKeyToolsUseCase(toolsRepository)

    const tools = await findToolsByKey.execute(key)

    return tools
  }

  public async delete(params: { id: number }): Promise<void> {
    const toolsRepository = new ToolsRepository()
    const redisRepository = new RedisCacheRepository()
    const deleteToolsUseCase = new DeleteToolsUseCase(toolsRepository, redisRepository)

    await deleteToolsUseCase.execute(params.id)
  }
}

export default new ToolsController();