import { DeleteToolsUseCase } from "../../../../src/application/usecases/tools/delete-tools.usecase"
import { IDeleteToolsUseCase } from "../../../../src/domain/interfaces/usecases/tools"
import { NotFoundError } from "../../../../src/infra/errors"

describe('app :: usecase :: tools :: delete-tools', () => {
  let deleteToolUseCase: IDeleteToolsUseCase

  const toolsRepositoryMock = {
    findBy: jest.fn(),
    deleteById: jest.fn()
  } as any
  const cacheRepositoryMock = {
    set: jest.fn().mockReturnValue({}),
    get: jest.fn().mockReturnValue({})
  } as any

  beforeEach(() => {
    deleteToolUseCase = new DeleteToolsUseCase(toolsRepositoryMock, cacheRepositoryMock)
  })

  it('Should delete a tool', async () => {
    jest.spyOn(toolsRepositoryMock, 'findBy').mockReturnValue({
      id: '1',
      title: 'title-here',
      link: 'link-here',
      description: 'description-here',
      tags: [],
    })
    await deleteToolUseCase.execute(1)
    expect(toolsRepositoryMock.findBy).toHaveBeenCalledWith({ id: 1 })
  })
  it('Should throw error if tool not found', async () => {
    jest.spyOn(toolsRepositoryMock, 'findBy').mockReturnValue(null)
    try {
      const response = await deleteToolUseCase.execute(1)
      expect(response).toBeFalsy()
    } catch (error) {
      expect(error instanceof NotFoundError).toBeTruthy()
      expect((error as NotFoundError).message).toBe('tools not found')

    }
  })
})