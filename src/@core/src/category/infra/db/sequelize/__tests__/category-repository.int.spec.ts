import { Category } from '#category/domain';
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

  it('should insert a new category entity', async () => {
    let category = new Category({ name: 'Movie'});
    repository.insert(category);

    const model = await CategoryModel.findByPk(category.id);
    expect(model.toJSON()).toStrictEqual(category.toJson())
  });
});