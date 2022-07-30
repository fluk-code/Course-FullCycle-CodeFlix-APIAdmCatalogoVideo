import { Category } from '@category/domain/entities/category';
import CategoryRepository from '@category/domain/repositories/category.repository';
import IUseCase from '@core/seedwork/application/use-case';
import { CategoryOutputDTO } from '../dto/category-output';


export default class CreateCategoryUseCase implements IUseCase<Input, Output> {

  constructor(
    private readonly _categoryRepository: CategoryRepository.Repository
  ) {}

  async execute(input: Input): Promise<Output> {
    const entityCategory = new Category(input);
    await this._categoryRepository.insert(entityCategory);

    return {
      ... entityCategory.toJson()
    }
  }
}

export type Input = {
  name: string;
  description?: string;
  isActive?: boolean;
}

export type Output = CategoryOutputDTO;