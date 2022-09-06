import { Category } from '#category/domain';
import { NotFoundError, UniqueEntityId } from '#seedwork/domain';
import { Sequelize } from 'sequelize-typescript';
import { CategorySequelizeRepository } from './category-repository';
import { CategoryModel } from './category.model';

const categorySequelizeRepositoryName = CategorySequelizeRepository.name;
const categorySequelizeRepositoryMethodInsertName = CategorySequelizeRepository.prototype.insert.name;
const categorySequelizeRepositoryMethodFindByIdName = CategorySequelizeRepository.prototype.findById.name;

describe(`${categorySequelizeRepositoryName} Unit Test`, () => {
  let sequelize: Sequelize;
  let repository: CategorySequelizeRepository;

  beforeAll(() => {
    jest.useFakeTimers('modern').setSystemTime(new Date(2021, 1, 1, 1));

    sequelize = new Sequelize({
      dialect: 'sqlite',
      host: ':memory:',
      logging: true,
      models: [CategoryModel]
    });
  })

  beforeEach(async () => {
    repository = new CategorySequelizeRepository(CategoryModel);
    await sequelize.sync({ force: true });
  })

  afterAll(async () => {
    await sequelize.close();
  })
  
  it(`should ${categorySequelizeRepositoryMethodInsertName} a new entity`, async () => {
    let category = new Category({ name: 'some name' });
    await repository.insert(category);   

    let model = (await CategoryModel.findByPk(category.id)).toJSON();
    expect(model).toStrictEqual(category.toJson());
    expect(model).toHaveProperty('id');
    expect(model).toHaveProperty('name');
    expect(model).toHaveProperty('description');
    expect(model).toHaveProperty('isActive');
    expect(model).toHaveProperty('createdAt');
    expect(model.name).toBe('some name');
    expect(model.description).toBeNull();
    expect(model.isActive).toBeTruthy();
    expect(model.createdAt.toISOString()).toBe(new Date(Date.now()).toISOString());

    category = new Category({ name: 'some name', description: 'some description', isActive: false });
    await repository.insert(category);   
    
    model = (await CategoryModel.findByPk(category.id)).toJSON();
    expect(model).toStrictEqual(category.toJson());
    expect(model).toHaveProperty('id');
    expect(model).toHaveProperty('name');
    expect(model).toHaveProperty('description');
    expect(model).toHaveProperty('isActive');
    expect(model).toHaveProperty('createdAt');
    expect(model.name).toBe('some name');
    expect(model.description).toBe('some description');
    expect(model.isActive).toBeFalsy();
    expect(model.createdAt.toISOString()).toBe(new Date(Date.now()).toISOString());

  });

  it(`should ${categorySequelizeRepositoryMethodFindByIdName} throws error when entity not found`, async () => {
    let fakeId: string | UniqueEntityId = 'fake-invalid-id';
    await expect(repository.findById(fakeId)).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID ${fakeId}`)
    )

    fakeId = new UniqueEntityId('a0f841d2-1d61-4de6-9460-49c33f5ba27d');
    await expect(repository.findById(fakeId)).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID ${fakeId}`)
    )
  });
  
  it(`should ${categorySequelizeRepositoryMethodFindByIdName} when entity exists`, async () => {
    const entityCategory = new Category({name: 'some name'});
    await repository.insert(entityCategory);

    let categoryFound = await repository.findById(entityCategory.id);
    expect(entityCategory.toJson()).toStrictEqual(categoryFound.toJson());

    categoryFound = await repository.findById(entityCategory.uniqueEntityId);
    expect(entityCategory.toJson()).toStrictEqual(categoryFound.toJson());
  });
});