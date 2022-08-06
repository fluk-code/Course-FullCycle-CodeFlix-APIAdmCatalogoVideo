import { SortDirection } from '@core/seedwork/domain/repository/repository-contracts';

export type SearchInputDTO<Filter = string> = {
  page?: number;
  perPage?: number;
  sort?: string | null;
  sortDirection?: SortDirection | null;
  filter?: Filter | null;
}