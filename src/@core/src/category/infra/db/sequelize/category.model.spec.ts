import { Sequelize } from 'sequelize-typescript';
import { CategoryModel } from './category.model';

const categoryModelName = CategoryModel.name;
/*
  ### Anotações: 
  > "logging: true" exibe no console.log os comando SQL executados

  > "sync({ force: true })" força ser recriado os modelos. Utilizar 
  somente em teste pois realiza DROP nas tabelas
*/

describe(`${categoryModelName} Unit Test`, () => {
  let sequelize: Sequelize;

  beforeAll(() => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      host: ':memory:',
      logging: true,
      models: [CategoryModel]
    });
  })

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  })

  afterAll(async () => {
    await sequelize.close();
  })

  it('should create model with correct values', async () => {
    const input = {
      id: 'a0f841d2-1d61-4de6-9460-49c33f5ba27d', 
      name: 'some name',
      isActive: true,
      createdAt: new Date()
    }

    const categoryOutput = await CategoryModel.create(input);

    expect(categoryOutput.toJSON()).toStrictEqual(input);
  });
});