import Entity from '../entity/entity';
import { UniqueEntityId } from '../value-objects/unique-entity-id.vo';

export interface IRepository<E extends Entity> {
  insert(entity: E): Promise<void>;
  findAll(): Promise<E[]>;
  findById(id: string | UniqueEntityId): Promise<E>;
  update(entity: E): Promise<void>;
  delete(id: string | UniqueEntityId): Promise<void>;
}

export type SortDirection = "asc" | "desc";

export type SearchProperties<Filter = string> = {
  page?: number;
  perPage?: number;
  sort?: string | null;
  sortDirection?: SortDirection | null;
  filter?: Filter | null;
}

export class SearchParams<Filter = string> {
  protected _page: number;
  protected _perPage: number = 15;
  protected _sort: string | null;
  protected _sortDirection: SortDirection | null;
  protected _filter: Filter | null;

  constructor(props: SearchProperties<Filter> = {}) {
    this.page = props.page;
    this.perPage = props.perPage;
    this.sort = props.sort;
    this.sortDirection = props.sortDirection;
    this.filter = props.filter;
  }

  get page(){
    return this._page;
  }

  private set page(value: number){
    let page = +value;

    if(Number.isNaN(page) || page <= 0 || parseInt(page as any) !== page) {
      page = 1;
    }

    this._page = page;
  }

  get perPage(){
    return this._perPage;
  }

  private set perPage(value: number){
    let perPage = +value;

    if(
      Number.isNaN(perPage) || 
      perPage <= 0 || 
      parseInt(perPage as any) !== perPage || 
      typeof value == 'boolean'
    ) {
      perPage = this._perPage;
    }

    this._perPage = perPage;
  }

  get sort(): string | null{
    return this._sort;
  }

  private set sort(value: string | null){
    this._sort = value === null || value === undefined || value === "" ? null : `${value}`;
  }

  get sortDirection(): SortDirection | null {
    return this._sortDirection;
  }

  private set sortDirection(value: SortDirection | null) {
    if(!this._sort){
      this._sortDirection = null;
      return;
    }

    const direction = `${value}`.toLowerCase();
    this._sortDirection = direction !== "asc" && direction !== "desc" ? "asc" : direction;
  }

  get filter(): Filter | null{
    return this._filter;
  }

  private set filter(value: Filter | null) {
    this._filter = 
      value === null || value === undefined || (value as unknown) === "" 
      ? null 
      : `${value}` as any;
  }
}

type SearchResultProperties<E extends Entity,Filter> = {
  readonly items: E[];
  readonly total: number;
  readonly currentPage: number;
  readonly perPage: number;
  readonly sort?: string | null;
  readonly sortDirection?: string | null;
  readonly filter: Filter;
}

export class SearchResult<E extends Entity = Entity, Filter = string> {
  readonly items: E[];
  readonly total: number;
  readonly currentPage: number;
  readonly perPage: number;
  readonly lastPage: number;
  readonly sort?: string | null;
  readonly sortDirection?: string | null;
  readonly filter: Filter;

  constructor(props: SearchResultProperties<E, Filter>) {
    this.items = props.items;
    this.total = props.total;
    this.currentPage = props.currentPage;
    this.perPage = props.perPage;
    this.lastPage = Math.ceil(props.total / this.perPage);
    this.sort = props.sort;
    this.sortDirection = props.sortDirection;
    this.filter = props.filter;
  }

  toJSON() {
    return {
      items: this.items,
      total: this.total,
      currentPage: this.currentPage,
      perPage: this.perPage,
      lastPage: this.lastPage,
      sort: this.sort,
      sortDirection: this.sortDirection,
      filter: this.filter,
    }
  }
}

export interface ISearchableRepository<
  E extends Entity,
  Filter = string, 
  SearchInput = SearchParams,
  SearchOutput = SearchResult<E, Filter>>
  extends IRepository<E> 
{
  sortableFields: string[];
  search(props: SearchInput): Promise<SearchOutput>;
}