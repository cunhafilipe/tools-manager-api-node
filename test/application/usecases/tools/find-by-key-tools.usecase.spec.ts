import { FindByKeyToolsUseCase } from "../../../../src/application/usecases/tools/find-by-key-tools.usecase"
import { IFindByKeyToolsUseCase } from "../../../../src/domain/interfaces/usecases/tools"
import { NotFoundError } from "../../../../src/infra/errors"

describe('app :: usecases :: tools :: find-by-key-tool', () => {
  let findByKeyToolUseCase: IFindByKeyToolsUseCase

  const toolsRepositoryMock = {
    findByKey: jest.fn().mockReturnValue([{
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

  beforeEach(() => {
    findByKeyToolUseCase = new FindByKeyToolsUseCase(toolsRepositoryMock)
  })
  it('should find a tools by key word', async () => {
    const result = await findByKeyToolUseCase.execute(
      'teste'
    )

    expect(toolsRepositoryMock.findByKey).toHaveBeenCalledWith('teste')
    expect(result).toEqual([{
      description: "description-here",
      id: "1",
      link: "link-here-teste",
      tags: [
        "tag-title",
      ],
      title: "title-here",
    },
    ])
  })
  it('Should throw error if tool does not exist', async () => {
    jest.spyOn(toolsRepositoryMock, 'findByKey').mockReturnValue(null)
    try {
      const response = await findByKeyToolUseCase.execute(
        'teste'
      )

      expect(response).toBeFalsy()

    } catch (error) {
      expect(error instanceof NotFoundError).toBeTruthy()
      expect((error as NotFoundError).message).toBe('Not Found')

    }

  })

})