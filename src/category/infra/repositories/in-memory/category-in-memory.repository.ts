import { Category } from '@category/domain/entities/category';
import CategoryRepository from '@category/domain/repositories/category.repository';
import { InMemorySearchableRepository } from '@core/seedwork/domain/repository/in-memory.repository';
import { SortDirection } from '@core/seedwork/domain/repository/repository-contracts';


export default class CategoryInMemoryRepository 
  extends InMemorySearchableRepository<
    Category
  > 
  implements CategoryRepository.Repository
{
  protected async applyFilter(
    items: Category[],
    filter: CategoryRepository.Filter
  ): Promise<Category[]> {
    if(!filter) {
      return Promise.resolve(items);
    }

    return Promise.resolve(items.filter(item => {
      return (
        item.props.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
      );
    }));
  }

  protected applySort(
    items: Category[],
    sort: string,
    sortDirection: SortDirection
  ): Promise<Category[]> {
    return !sort
      ? super.applySort(items, 'createdAt', 'desc')
      : super.applySort(items, sort, sortDirection);
  }
}