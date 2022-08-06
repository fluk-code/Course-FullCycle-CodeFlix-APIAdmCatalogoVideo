import IUseCase from '@core/seedwork/application/use-case';
import { PaginationOutputDTO, PaginationOutputMapper, SearchInputDTO } from '@core/seedwork/application/dto';

import CategoryRepository from '@category/domain/repositories/category.repository';
import { CategoryOutputDTO, CategoryOutputMapper } from '../dto';


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