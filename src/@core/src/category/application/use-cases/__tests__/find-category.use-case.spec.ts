import { Category } from '#category/domain/entities/category';
import { CategoryInMemoryRepository } from '#category/infra/db/in-memory/repositories';
import { NotFoundError } from '#seedwork/domain/errors';
import FindCategoryUseCase from '../find-category.use-case';

const findCategoryUseCaseUseCaseName = FindCategoryUseCase.UseCase.name;

describe(`${findCategoryUseCaseUseCaseName} Unit Tests`, () => {
  let useCase: FindCategoryUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new FindCategoryUseCase.UseCase(repository);
  });

  afterEach(() => {
    repository.items = [];
  })

  it('should throws error when entity not found', async () => {
    expect(
      () => useCase.execute({id: 'id-not-found'})
    ).rejects.toThrow(new NotFoundError('Entity Not Found using ID id-not-found'));
  });

  it('should throws error when entity id is not provided', async () => {
    expect(
      () => useCase.execute({} as FindCategoryUseCase.Input)
    ).rejects.toThrow(new NotFoundError('Entity Not Found using ID undefined'));
  });

  it('should return a category when id is provided', async () => {
    const items = [
      new Category({name: 'some name 1'}),
      new Category({name: 'some name 2'}),
    ];
    repository.items = items;
    
    const output = await useCase.execute({id: items[0].id});

    expect(output).toStrictEqual({
      ... items[0].toJson()
    })
  });
});