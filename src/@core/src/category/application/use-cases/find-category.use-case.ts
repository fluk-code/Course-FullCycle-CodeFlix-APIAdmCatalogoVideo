import CategoryRepository from '#category/domain/repositories/category.repository';
import IUseCase from '#seedwork/application/use-case';
import { CategoryOutputDTO } from '../dto/category-output';

export namespace FindCategoryUseCase {
  export class UseCase implements IUseCase<Input, Output> {
  
    constructor(
      private readonly _categoryRepository: CategoryRepository.Repository
    ) {}
  
    async execute(input: Input): Promise<Output> {
      const { id } = input;
      const entityCategory = await this._categoryRepository.findById(id);
  
      return {
        ... entityCategory.toJson()
      }
    }
  }
  
  export type Input = {
    id: string;
  }
  
  export type Output = CategoryOutputDTO;
}

export default FindCategoryUseCase;