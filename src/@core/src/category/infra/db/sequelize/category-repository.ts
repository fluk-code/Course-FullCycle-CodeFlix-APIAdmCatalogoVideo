import { NotFoundError, UniqueEntityId } from '#seedwork/domain';

import { Category } from '#category/domain';
import CategoryRepository from '#category/domain/repositories/category.repository';

import { CategoryModel } from './category-model';
import { CategoryModelMapper } from './category-model-mapper';

export class CategorySequelizeRepository implements CategoryRepository.Repository {
  sortableFields: string[];

  constructor(private categoryModel: typeof CategoryModel) {}

  async insert(entity: Category): Promise<void> {
    await this.categoryModel.create(entity.toJson());
  };

  async findById(id: string | UniqueEntityId): Promise<Category> {
    const _id = `${id}`;
    const model = await this._get(_id);
    return CategoryModelMapper.toEntity(model);
  };

  //@ts-expect-error
  async findAll(): Promise<Category[]> {};
  async update(entity: Category): Promise<void> {};
  async delete(id: string | UniqueEntityId): Promise<void> {};
  
  //@ts-expect-error
  async search(props: CategoryRepository.SearchParams): Promise<CategoryRepository.SearchResult> {};

  private async _get(id: string): Promise<CategoryModel> {
    const model = await this.categoryModel.findByPk(id, {
      rejectOnEmpty: new NotFoundError(`Entity not found using ID ${id}`),
    });

    return model;
  }
}