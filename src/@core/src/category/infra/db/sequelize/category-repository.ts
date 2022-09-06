import { UniqueEntityId } from '#seedwork/domain';

import { Category } from '#category/domain';
import { CategoryRepository } from '#category/domain/repositories/category.repository';
import { CategoryModel } from './category.model';

export class CategorySequelizeRepository implements CategoryRepository.Repository {
  sortableFields: string[] = ['name', 'createdAt'];

  constructor(
    private readonly categoryModel: typeof CategoryModel
  ) {}

  async insert(entity: Category): Promise<void> {
    await this.categoryModel.create(entity.toJson());
  }

  //@ts-expect-error
  async findAll(): Promise<Category[]> {
  }

  //@ts-expect-error
  async findById(id: string | UniqueEntityId): Promise<Category> {
  }

  async update(entity: Category): Promise<void> {
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
  }

  //@ts-expect-error
  protected async _get(id: string): Promise<Category>{
  }

  async search(
    props: CategoryRepository.SearchParams
  ): Promise<CategoryRepository.SearchResult> {}
}