import { ListToolsUseCase } from "../../../../src/application/usecases/tools/list-tools.usecase"
import { IListToolsUseCase } from "../../../../src/domain/interfaces/usecases/tools"

describe('app :: usecases :: tols :: list-tools', () => {
  const cacheRepositoryMock = {
    set: jest.fn().mockReturnValue({}),
    get: jest.fn().mockReturnValue({})
  } as any

  const toolsRepositoryMock = {
    list: jest.fn().mockReturnValue([{
      id: '1',
      title: 'title-here',
      link: 'link-here-teste',
      description: 'description-here',
      tags: [{
        id: 1,
        title: 'tag-title',
        tools_id: 1

      }],
    }])
  } as any
  let listToolsUseCase: IListToolsUseCase

  beforeEach(() => {
    listToolsUseCase = new ListToolsUseCase(toolsRepositoryMock, cacheRepositoryMock)

  })

  it('Should list all tools', async () => {
    await listToolsUseCase.execute()
    expect(toolsRepositoryMock.list).toHaveBeenCalled()
  })
})