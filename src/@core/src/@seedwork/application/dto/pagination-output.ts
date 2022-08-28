import Entity from '#seedwork/domain/entity/entity';
import { SearchResult } from '#seedwork/domain/repository/repository-contracts';

export type PaginationOutputDTO<Items = Entity> = {
  items: Items[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
}

export class PaginationOutputMapper {

  static toOutput(result: SearchResult): Omit<PaginationOutputDTO, 'items'> {
    return {
      total: result.total,
      currentPage: result.currentPage,
      lastPage: result.lastPage,
      perPage: result.perPage,
    }
  }
}