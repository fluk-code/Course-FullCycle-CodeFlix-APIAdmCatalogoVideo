import CategoryRepository from '@category/domain/repositories/category.repository';
import { PaginationOutputDTO, PaginationOutputMapper } from '@core/seedwork/application/dto/pagination-output';
import { SearchInputDTO } from '@core/seedwork/application/dto/search-input';
import IUseCase from '@core/seedwork/application/use-case';
import { CategoryOutputDTO, CategoryOutputMapper } from '../dto/category-output';


export default class FindAllCategoriesUseCase implements IUseCase<Input, Output> {

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