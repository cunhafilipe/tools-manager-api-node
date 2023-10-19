import { CreateToolsUseCase } from "../../../../src/application/usecases/tools/create-tools.usecase"
import { ICreateToolsUseCase } from "../../../../src/domain/interfaces/usecases/tools"
import { InvalidDataError } from "../../../../src/infra/errors"

describe('app :: usecases :: tools :: create-tools', () => {
  let createToolsUseCase: ICreateToolsUseCase

  const toolsRepositoryMock = {
    findBy: jest.fn().mockReturnValue(null),
    create: jest.fn().mockReturnValue({}),
  } as any

  const tagsRepositoryMock = {
    create: jest.fn().mockReturnValue({})
  } as any

  const cacheRepositoryMock = {
    set: jest.fn().mockReturnValue({}),
    get: jest.fn().mockReturnValue({})
  } as any

  beforeEach(() => {
    createToolsUseCase = new CreateToolsUseCase(toolsRepositoryMock, tagsRepositoryMock, cacheRepositoryMock)
  })

  it('Should create a new tool', async () => {
    await createToolsUseCase.execute({
      title: 'title-here',
      link: 'link-here',
      description: 'description-here',
      tags: ["tags"]
    })

    expect(toolsRepositoryMock.findBy).toHaveBeenCalledWith({ title: 'title-here' })
    expect(toolsRepositoryMock.create).toHaveBeenCalledWith("title-here", "link-here", "description-here")
  })
  it('Should throw error if tool already exists', async () => {
    jest.spyOn(toolsRepositoryMock, 'findBy').mockReturnValue({
      id: '1',
      title: 'title-here',
      link: 'link-here',
      description: 'description-here',
      tags: [],
    })
    try {
      const response = await createToolsUseCase.execute({
        title: 'title-here',
        link: 'link-here',
        description: 'description-here',
        tags: []

      })
      expect(response).toBeFalsy()
    } catch (error) {
      expect(error instanceof InvalidDataError).toBeTruthy()
      expect((error as InvalidDataError).message).toBe('Tools already exists!')

    }
  })
})