import { Category } from '#category/domain/entities';
import { CategoryOutputMapper } from './category-output';

const categoryOutputMapperName = CategoryOutputMapper.name;

describe(`${categoryOutputMapperName} Unit Tests`, () => {
  it('should convert a category in output', () => {
    const createdAt = new Date();
    const entity = new Category({
      name: 'Some name',
      description: 'Some description',
      isActive: true,
      createdAt
    });

    const spyToJson = jest.spyOn(entity, 'toJson');

    const outputMapped = CategoryOutputMapper.toOutput(entity);

    expect(spyToJson).toHaveBeenCalledTimes(1);
    expect(outputMapped).toStrictEqual({
      id: outputMapped.id,
      name: outputMapped.name,
      description: outputMapped.description,
      isActive: true,
      createdAt
    });

  });
});