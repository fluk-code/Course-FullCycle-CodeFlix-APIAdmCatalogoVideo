import { Category } from '#category/domain';
import { UniqueEntityId } from '#seedwork/domain';
import { CategoryModel } from './category-model';

export class CategoryModelMapper {
  static toEntity(model: CategoryModel): Category {
    const {
      id,
      ... props
    } = model.toJSON();
    const uniqueId = new UniqueEntityId(id);

    return new Category(props, uniqueId);
  }
}