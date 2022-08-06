import { Category } from '@category/domain/entities/category';
import CategoryInMemoryRepository from '@category/infra/repositories/in-memory/category-in-memory.repository';
import { NotFoundError } from '@core/seedwork/domain/errors';
import FindCategoryUseCase, { Input } from '../find-category.use-case';


describe(`${FindCategoryUseCase.name} Unit Tests`, () => {
  let useCase: FindCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new FindCategoryUseCase(repository);
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
      () => useCase.execute({} as Input)
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