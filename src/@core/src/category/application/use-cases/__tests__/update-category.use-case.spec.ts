import { NotFoundError } from '#seedwork/domain/errors';

import { Category } from '#category/domain/entities/category';

import UpdateCategoryUseCase from '../update-category.use-case';
import { CategoryInMemoryRepository } from '#category/infra/db/in-memory';


const updateCategoryUseCaseName = UpdateCategoryUseCase.UseCase.name;

describe(`${updateCategoryUseCaseName} Unit Tests`, () => {
  let useCase: UpdateCategoryUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new UpdateCategoryUseCase.UseCase(repository);
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
    let input = {};

    input = {
      id: category.id,
      name: 'some name test',
    }
    const outputNotIsActive =await useCase.execute(input as UpdateCategoryUseCase.Input);


    input = {
      id: category.id,
      name: 'some name test',
      isActive: true
    }
    const outputTrueIsActive =await useCase.execute(input as UpdateCategoryUseCase.Input);
    
    input = {
      id: category.id,
      name: 'some name test',
      isActive: false
    }
    const outputFalseIsActive =await useCase.execute(input as UpdateCategoryUseCase.Input);

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