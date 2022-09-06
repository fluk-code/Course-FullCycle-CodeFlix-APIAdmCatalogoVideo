import { NotFoundError, UniqueEntityId } from '#seedwork/domain';

import { Category } from '#category/domain';
import CategoryRepository from '#category/domain/repositories/category.repository';

import { CategoryModel } from './category.model';
import { CategoryModelMapper } from './category-mapper';

export class CategorySequelizeRepository implements CategoryRepository.Repository {
  sortableFields: string[] = ['name', 'createdAt'];

  constructor(
    private readonly categoryModel: typeof CategoryModel
  ) {}

  async insert(entity: Category): Promise<void> {
    await this.categoryModel.create(entity.toJson());
  }

  async findById(id: string | UniqueEntityId): Promise<Category> {
    const _id = id.toString();
    const categoryModel = await this._get(_id);
    return CategoryModelMapper.toEntity(categoryModel);
  }

  //@ts-expect-error
  async findAll(): Promise<Category[]> {
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


  private async _get(id: string): Promise<CategoryModel>{
    return await this.categoryModel.findByPk(
      id,
      { rejectOnEmpty: new NotFoundError(`Entity Not Found using ID ${id}`)}
    );
  }
}