import IUseCase from '#seedwork/application/use-case';
import { SearchInputDTO } from '#seedwork/application/dto/search-input';
import { PaginationOutputDTO, PaginationOutputMapper } from '#seedwork/application/dto/pagination-output';

import CategoryRepository from '#category/domain/repositories/category.repository';
import { CategoryOutputDTO, CategoryOutputMapper } from '../dto';

export namespace FindAllCategoriesUseCase {
  export class UseCase implements IUseCase<Input, Output> {
  
    constructor(
      private readonly _categoryRepository: CategoryRepository.Repository
    ) {}
  
    async execute(input: Input): Promise<Output> {
      const params = new CategoryRepository.SearchParams(input);
      const searchResult= await this._categoryRepository.search(params);
  
      return this.toOutput(searchResult);
    }
  
    private toOutput(searchResult: CategoryRepository.SearchResult): Output {
      const items = searchResult
        .items
        .map(
          (item) => CategoryOutputMapper.toOutput(item)
        );
  
      return {
        items,
        ... PaginationOutputMapper.toOutput(searchResult)
      }
    }
  }
  
  export type Input =  SearchInputDTO;
  
  export type Output = PaginationOutputDTO<CategoryOutputDTO>;
}

export default FindAllCategoriesUseCase;