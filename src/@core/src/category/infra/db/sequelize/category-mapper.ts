import { Category } from '#category/domain';
import { UniqueEntityId } from '#seedwork/domain';
import { CategoryModel } from './category.model';

export class CategoryModelMapper {
  static toEntity(model: CategoryModel): Category {
    
    const { id, ... otherFields } = model.toJSON();
    return new Category(otherFields, new UniqueEntityId(id));
  }
}