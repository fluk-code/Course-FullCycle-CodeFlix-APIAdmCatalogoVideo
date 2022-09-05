import { FindAllCategoriesUseCase } from '@fc/Core_AdmCatalogoVideo/category/application';
import { SortDirection } from '@fc/Core_AdmCatalogoVideo/@seedwork/domain';

export class SearchCategoryDto implements FindAllCategoriesUseCase.Input {
  page?: number;
  perPage?: number;
  sort?: string | null;
  sortDirection?: SortDirection | null;
  filter?: null;
}
