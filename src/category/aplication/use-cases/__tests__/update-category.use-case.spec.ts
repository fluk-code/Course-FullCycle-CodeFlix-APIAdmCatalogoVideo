import { Category } from '@category/domain/entities/category';
import CategoryInMemoryRepository from '@category/infra/repositories/in-memory/category-in-memory.repository';
import { NotFoundError } from '@core/seedwork/domain/errors/not-found.error';
import UpdateCategoryUseCase, { Input } from '../update-category.use-case';


const updateCategoryUseCaseName = UpdateCategoryUseCase.name;

describe(`${updateCategoryUseCaseName} Unit Tests`, () => {
  let useCase: UpdateCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new UpdateCategoryUseCase(repository);
  });

  afterEach(() => {
    repository.items = [];
  })

  it('should throws error when entity not found', async () => {
    expect(
      () => useCase.execute({
        id: 'id-not-found',
        name: 'some name'
      })
    ).rejects.toThrow(new NotFoundError('Entity Not Found using ID id-not-found'));
  });
  
  it('should update a category return the entity when name is provided', async () => {
    const category = new Category({ name: 'some name test'});
    repository.items.push(category);
    const input = {
      id: category.id,
      name: 'some updated name test'
    }
    const output =await useCase.execute(input);

    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: 'some updated name test',
      description: null,
      isActive: true,
      createdAt: repository.items[0].createdAt
    })
  });

  it('should update a category return the entity when description is provided', async () => {
    const category = new Category({ name: 'some name test'});
    repository.items.push(category);

    let input = {
      id: category.id,
      name: 'some name test',
      description: 'some updated description test'
    }
    const output =await useCase.execute(input);


    input = {
      id: category.id,
      name: 'some name test',
      description: null
    }
    const outputDescriptionNull =await useCase.execute(input);

    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: 'some name test',
      description: 'some updated description test',
      isActive: true,
      createdAt: repository.items[0].createdAt
    });
    expect(outputDescriptionNull).toStrictEqual({
      id: repository.items[0].id,
      name: 'some name test',
      description: null,
      isActive: true,
      createdAt: repository.items[0].createdAt
    })
  });

  it('should update a category return the entity when isActive is provided', async () => {
    const category = new Category({ name: 'some name test'});
    repository.items.push(category);
    let input = {} as Input;

    input = {
      id: category.id,
      name: 'some name test',
    }
    const outputNotIsActive =await useCase.execute(input);


    input = {
      id: category.id,
      name: 'some name test',
      isActive: true
    }
    const outputTrueIsActive =await useCase.execute(input);
    
    input = {
      id: category.id,
      name: 'some name test',
      isActive: false
    }
    const outputFalseIsActive =await useCase.execute(input);

    expect(outputNotIsActive).toStrictEqual({
      id: repository.items[0].id,
      name: 'some name test',
      description: null,
      isActive: true,
      createdAt: repository.items[0].createdAt
    });
    expect(outputTrueIsActive).toStrictEqual({
      id: repository.items[0].id,
      name: 'some name test',
      description: null,
      isActive: true,
      createdAt: repository.items[0].createdAt
    });
    expect(outputFalseIsActive).toStrictEqual({
      id: repository.items[0].id,
      name: 'some name test',
      description: null,
      isActive: false,
      createdAt: repository.items[0].createdAt
    });
  });

  it('should call insert method from repository with corrects amount times', async () => {
    const spyUpdate = jest.spyOn(repository, 'update');
    
    const category = new Category({ name: 'some name test'});
    repository.items.push(category);
    const input = {
      id: category.id,
      name: 'some updated name test'
    }
    await useCase.execute(input);

    expect(spyUpdate).toHaveBeenCalledTimes(1);
  });
});