import { NotFoundError } from '#seedwork/domain/errors';
import { UniqueEntityId } from '#seedwork/domain/value-objects';

import { Category } from '#category/domain/entities/category';
import CategoryInMemoryRepository from '#category/infra/repositories/in-memory/category-in-memory.repository';
import DeleteCategoryUseCase from '../delete-category.use-case';

const deleteCategoryUseCaseName = DeleteCategoryUseCase.UseCase.name;

describe(`${deleteCategoryUseCaseName} Unit Tests`, () => {
  let useCase: DeleteCategoryUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new DeleteCategoryUseCase.UseCase(repository);
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
      () => useCase.execute({} as DeleteCategoryUseCase.Input)
    ).rejects.toThrow(new NotFoundError('Entity Not Found using ID undefined'));
  });


  it('should delete category when id is provided', async () => {
    const spyRepoDelete = jest.spyOn(repository, 'delete');

    const uuid = new UniqueEntityId()
    const items = [
      new Category({name: 'some name 1'}, uuid),
      new Category({name: 'some name 2'}),
    ];
    repository.items = items;
    
    const output = await useCase.execute({ id: uuid.toString() });

    expect(repository.items).toHaveLength(1);
    expect(spyRepoDelete).toBeCalledTimes(1);
    expect(spyRepoDelete).toBeCalledWith(uuid.toString());
  });
});