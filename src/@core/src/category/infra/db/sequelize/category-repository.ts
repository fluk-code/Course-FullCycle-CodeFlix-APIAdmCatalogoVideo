import { UniqueEntityId } from '../../../../@seedwork/domain';
import { Category } from '../../../domain';
import CategoryRepository from '../../../domain/repositories/category.repository';
import { CategoryModel } from './category-model';

export class CategorySequelizeRepository implements CategoryRepository.Repository {
  sortableFields: string[];

  constructor(private categoryModel: typeof CategoryModel) {}

  async insert(entity: Category): Promise<void> {
    await this.categoryModel.create(entity.toJson());
  };

  //@ts-expect-error
  async findAll(): Promise<Category[]> {};
  //@ts-expect-error
  async findById(id: string | UniqueEntityId): Promise<Category> {};
  async update(entity: Category): Promise<void> {};
  async delete(id: string | UniqueEntityId): Promise<void> {};
  
  //@ts-expect-error
  async search(props: CategoryRepository.SearchParams): Promise<CategoryRepository.SearchResult>;
}