import { SearchResult } from '@core/seedwork/domain/repository/repository-contracts';
import { PaginationOutputMapper } from './pagination-output';

describe(`${PaginationOutputMapper.name} Unit Tests`, () => {
  it.only('should convert a searchResult in output', () => {
    const result = new SearchResult({
      items: ['Some item'] as any,
      total: 1,
      currentPage: 1,
      perPage: 1,
      sort: null,
      sortDirection: null,
      filter: null
    });

    const outputMapped = PaginationOutputMapper.toOutput(result);

    expect(outputMapped).toStrictEqual({
      total: 1,
      currentPage: 1,
      perPage: 1,
      lastPage: 1
    });

  });
});