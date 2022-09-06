import { DataType, Sequelize } from 'sequelize-typescript';
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

  it('should mapping properties with correct values', () => {
    const attributes = Object.keys(CategoryModel.getAttributes());
    expect(attributes).toStrictEqual(['id', 'name', 'description', 'isActive', 'createdAt'])
    
    const attributesMap = CategoryModel.getAttributes();
    
    const idAttribute = attributesMap.id;
    expect(idAttribute).toMatchObject({
      field: 'id',
      fieldName: 'id',
      primaryKey: true,
      type: DataType.UUID()
    });

    const nameAttribute = attributesMap.name;
    expect(nameAttribute).toMatchObject({
      field: 'name',
      fieldName: 'name',
      allowNull: false,
      type: DataType.STRING(255)
    });

    const descriptionAttribute = attributesMap.description;
    expect(descriptionAttribute).toMatchObject({
      field: 'description',
      fieldName: 'description',
      type: DataType.TEXT()
    });

    const isActiveAttribute = attributesMap.isActive;
    expect(isActiveAttribute).toMatchObject({
      field: 'isActive',
      fieldName: 'isActive',
      allowNull: false,
      type: DataType.BOOLEAN()
    });

    const createdAtAttribute = attributesMap.createdAt;
    expect(createdAtAttribute).toMatchObject({
      field: 'createdAt',
      fieldName: 'createdAt',
      allowNull: false,
      type: DataType.DATE()
    });
  });

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