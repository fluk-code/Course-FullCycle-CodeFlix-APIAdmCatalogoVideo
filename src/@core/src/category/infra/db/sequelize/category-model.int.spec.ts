import { DataType, Sequelize } from 'sequelize-typescript';
import { CategoryModel } from './category-model';

describe('Category Model Unit Test', () => {
  let sequelize: Sequelize;

  beforeAll(()=> {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      host: ':memory:',
      logging: false,
      models: [CategoryModel]
    });
  });

  beforeEach(async () => {
    // force: true = realiza o reset da database
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('mapping properties', () => {
    const attributesMap = CategoryModel.getAttributes();
    const attributes = Object.keys(attributesMap);
    
    expect(attributes).toStrictEqual(['id', 'name', 'description', 'isActive', 'createdAt'])
    expect(attributesMap.id).toMatchObject({
      field: 'id',
      fieldName: 'id',
      primaryKey: true,
      type: DataType.UUID()
    });
    expect(attributesMap.name).toMatchObject({
      field: 'name',
      fieldName: 'name',
      allowNull: false,
      type: DataType.STRING(255)
    });
    expect(attributesMap.description).toMatchObject({
      field: 'description',
      fieldName: 'description',
      allowNull: true,
      type: DataType.TEXT()
    });
    expect(attributesMap.isActive).toMatchObject({
      field: 'isActive',
      fieldName: 'isActive',
      allowNull: false,
      type: DataType.BOOLEAN()
    });
    expect(attributesMap.createdAt).toMatchObject({
      field: 'createdAt',
      fieldName: 'createdAt',
      allowNull: false,
      type: DataType.DATE()
    });
  });

  test('create',async () => {
    const arrange = {
      id: 'some valid uuid',
      name: 'some name',
      isActive: false,
      createdAt: new Date()
    };

    const category = await CategoryModel.create(arrange);
    expect(category.toJSON()).toStrictEqual(arrange);
  });
});