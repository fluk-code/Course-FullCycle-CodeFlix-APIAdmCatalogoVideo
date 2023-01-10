import { Category } from '#category/domain';
import { NotFoundError, UniqueEntityId } from '#seedwork/domain';
import { Sequelize } from 'sequelize-typescript';
import { CategoryModel } from '../category-model';
import { CategorySequelizeRepository } from '../category-repository';

describe('Category Sequelize Repository', () => {
  let sequelize: Sequelize;
  let repository: CategorySequelizeRepository;

  beforeAll(()=> {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      host: ':memory:',
      logging: false,
      models: [ CategoryModel ]
    });
  });

  beforeEach(async () => {
    repository = new CategorySequelizeRepository(CategoryModel);
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  
  describe('Insert method', () => {
    it('should insert a new category entity', async () => {
      let category = new Category({ name: 'Movie'});
      repository.insert(category);
  
      const model = await CategoryModel.findByPk(category.id);
      expect(model.toJSON()).toStrictEqual(category.toJson())
    });
  });

  describe('FindById method', () => {
    it('should throws error when category entity not found', async () => {
      await expect(repository.findById('fake invalid id')).rejects.toThrow(
        new NotFoundError('Entity not found using ID fake invalid id')
      );
  
      const uniqueId = new UniqueEntityId('cda16f22-e6ec-4ea3-a804-3aeee4b92581');
      await expect(repository.findById(uniqueId)).rejects.toThrow(
        new NotFoundError(`Entity not found using ID ${uniqueId}`)
      );
    });

    it('should find entity when valid id is provided', async () => {
      const entity = new Category({ name: 'some value' });
      await repository.insert(entity);

      const entityFoundById = await repository.findById(entity.id);
      console.log(entityFoundById);
      
      expect(entity.toJson()).toStrictEqual(entityFoundById.toJson());
      
      const entityFoundByUniqueEntityId = await repository.findById(entity.uniqueEntityId);
      expect(entity.toJson()).toStrictEqual(entityFoundByUniqueEntityId.toJson());
    });

  });
});