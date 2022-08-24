import CategoryRepository from '#category/domain/repositories/category.repository';
import IUseCase from '#seedwork/application/use-case';

export namespace DeleteCategoryUseCase {
  export class UseCase implements IUseCase<Input, Output> {
  
    constructor(
      private readonly _categoryRepository: CategoryRepository.Repository
    ) {}
  
    async execute(input: Input): Promise<Output> {
      const entityCategory = await this._categoryRepository.findById(input.id);
      await this._categoryRepository.delete(entityCategory.id);
    }
  }
  
  export type Input = {
    id: string;
  }
  
  export type Output = void;
}

export default DeleteCategoryUseCase;