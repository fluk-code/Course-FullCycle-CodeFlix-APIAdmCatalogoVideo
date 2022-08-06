import CategoryInMemoryRepository from '@category/infra/repositories/in-memory/category-in-memory.repository';
import CreateCategoryUseCase from '../create-category.use-case';

describe(`${CreateCategoryUseCase.name} Unit Tests`, () => {
  let useCase: CreateCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new CreateCategoryUseCase(repository);
  });

  afterEach(() => {
    repository.items = [];
  })

  it('should create a category return the entity when required properties are provided', async () => {
    const output = await useCase.execute({
      name: 'some name'
    });

    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: 'some name',
      description: null,
      isActive: true,
      createdAt: repository.items[0].createdAt
    })
  });

  it('should create a category return the entity when all properties are provided', async () => {
    const output = await useCase.execute({
      name: 'some name',
      description: 'some description',
      isActive: false
    });

    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: 'some name',
      description: 'some description',
      isActive: false,
      createdAt: repository.items[0].createdAt
    })
  });

  it('should call insert method from repository with corrects amount times', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');
    
    const input = {
      name: 'some name'
    }
    await useCase.execute(input);

    expect(spyInsert).toHaveBeenCalledTimes(1);
  });
});