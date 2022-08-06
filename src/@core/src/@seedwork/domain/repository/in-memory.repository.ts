import Entity from '../entity/entity';
import { NotFoundError } from '../errors/not-found.error';
import { UniqueEntityId } from '../value-objects/unique-entity-id.vo';
import { IRepository, ISearchableRepository, SearchParams, SearchResult, SortDirection } from './repository-contracts'

export abstract class InMemoryRepository<E extends Entity> implements IRepository<E> {
  items: E[] = [];
  
  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  async findById(id: string | UniqueEntityId): Promise<E> {
    const _id = `${id}`;
    return this._get(_id);
  }

  async update(entity: E): Promise<void> {
    await this._get(entity.id);
    
    const indexFound = this.items.findIndex(i => i.id === entity.id);
    this.items[indexFound] = entity;
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    const _id = `${id}`;
    await this._get(_id);

    const indexFound = this.items.findIndex(i => i.id === _id);
    this.items.splice(indexFound, 1);
  }

  protected async _get(id: string): Promise<E>{
    const item = this.items.find(i => i.id === id);
    if(!item) {
      throw new NotFoundError(`Entity Not Found using ID ${id}`);
    }
    return item;
  }
}

export abstract class InMemorySearchableRepository<E extends Entity> 
  extends InMemoryRepository<E>
  implements ISearchableRepository<E> 
{
  sortableFields: string[] = [];

  async search(props: SearchParams): Promise<SearchResult<E, string>> {
    const itemsFiltered = await this.applyFilter(this.items, props.filter);
    const itemsSorted= await this.applySort(itemsFiltered, props.sort, props.sortDirection);
    const itemsPaginated = await this.applyPaginate(itemsSorted, props.page, props.perPage);

    return new SearchResult({
      items: itemsPaginated,
      total: itemsFiltered.length,
      currentPage: props.page,
      perPage: props.perPage,
      sort: props.sort,
      sortDirection: props.sortDirection,
      filter: props.filter
    })
  }

  protected abstract applyFilter(items: E[], filter: string | null): Promise<E[]>; 

  protected async applySort(items: E[], sort: string | null, sortDirection: SortDirection | null): Promise<E[]> {
    if (!sort || !this.sortableFields.includes(sort)) {
      return items;
    };

    return [...items].sort((a,b) => {
      if(a.props[sort] > b.props[sort]) {
        return sortDirection === "desc" ? -1 : 1;
      };

      if(a.props[sort] < b.props[sort]) {
        return sortDirection === "asc" ? 1 : -1;
      };

      return 0;
    });
  };

  protected async applyPaginate(
    items: E[], 
    page: SearchParams['page'], 
    perPage: SearchParams['perPage']
  ): Promise<E[]> {
    const start = (page - 1) * perPage;
    const end = start + perPage; 

    return items.slice(start, end);
  };
}