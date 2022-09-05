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

});