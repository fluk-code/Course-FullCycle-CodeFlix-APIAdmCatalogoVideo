import Entity from '../../entity/entity';
import { UniqueEntityId } from '../../value-objects/unique-entity-id.vo';
import { InMemoryRepository, InMemorySearchableRepository } from '../in-memory.repository';
import { SearchParams, SearchResult } from '../repository-contracts';

const repositoryName = InMemoryRepository.name;
const repositoryMethodInsertName = InMemoryRepository.prototype.insert.name;
const repositoryMethodUpdateName = InMemoryRepository.prototype.update.name;
const repositoryMethodDeleteName = InMemoryRepository.prototype.delete.name;
const repositoryMethodFindAllName = InMemoryRepository.prototype.findAll.name;

const repositorySearchableName = InMemorySearchableRepository.name;
const repositorySearchableMethodSearchName = InMemorySearchableRepository.prototype.search.name;

type StubEntityProps = {
  name: string,
  price: number
};

class StubEntity extends Entity<StubEntityProps> {
  protected validate(): void {
    throw new Error('Method not implemented.');
  }
}

class SubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe(`${repositoryName} Unit Tests`, () => {
  let repository: SubInMemoryRepository;

  beforeEach(() =>{
    repository = new SubInMemoryRepository();
  });

  describe(`${repositoryMethodInsertName}`, () => {
    it('should insert a new entity', async () => {
      const entity = new StubEntity({ name: 'some value', price: 5 });
      await repository.insert(entity);
  
      expect(entity.toJson()).toStrictEqual(repository.items[0].toJson());
    });
  });

  describe(`${repositoryMethodFindAllName}`, () => {
    it('should throws error when entity not found', async () => {
      const validUuid = 'cda16f22-e6ec-4ea3-a804-3aeee4b92581';
   
      expect(repository.findById('invalid-id')).rejects.toThrow('Entity Not Found using ID invalid-id');
      expect(repository.findById(new UniqueEntityId(validUuid))).rejects.toThrow(`Entity Not Found using ID ${validUuid}`); 
    });

    it('should find entity when valid id is provided', async () => {
      const entity = new StubEntity({ name: 'some value', price: 5 });
      await repository.insert(entity);

      const entityFoundById = await repository.findById(entity.id);
      const entityFoundByUniqueEntityId = await repository.findById(entity.uniqueEntityId);
  
      expect(entity.toJson()).toStrictEqual(entityFoundById.toJson());
      expect(entity.toJson()).toStrictEqual(entityFoundByUniqueEntityId.toJson());
    });
  });

  describe(`${repositoryMethodFindAllName}`, () => {
    it('should return empty object when is not insert an entity', async () => {
      expect(repository.findAll()).toBeTruthy();
    });

    it('should find all entities', async () => {
      let entities = [];
      
      for (let e = 50; e > 0; e --) {
        const price = e;
        const entity = new StubEntity({ name: 'some value' + price, price });
        
        entities.push(entity);
        await repository.insert(entity);
      }

      

      const entitiesFound = await repository.findAll();

      expect(entities).toStrictEqual(entitiesFound);
      expect(entities).toHaveLength(50);

      entities.forEach((entity, index) => {
        expect(entity.toJson()).toStrictEqual(entitiesFound[index].toJson());
      })
    });
  });
  
  describe(`${repositoryMethodUpdateName}`, () => {
    it('should throws error when entity not found', async () => {
      const entity = new StubEntity({ name: 'some value', price: 5 });
      
      expect(repository.update(entity)).rejects.toThrow(`Entity Not Found using ID ${entity.id}`);
    });

    it('should change entity', async () => {
      const entity = new StubEntity({ name: 'some value', price: 5 });
      await repository.insert(entity);

      const entityUpdated = new StubEntity({ name: 'updated name', price: 1}, entity.uniqueEntityId);
      await repository.update(entityUpdated);

      expect(repository.items[0].toJson()).toStrictEqual(entityUpdated.toJson());      
    });
  });

  describe(`${repositoryMethodDeleteName}`, () => {
    it('should throws error when entity not found', async () => {
      const validUuid = 'cda16f22-e6ec-4ea3-a804-3aeee4b92581';
   
      expect(repository.delete('invalid-id')).rejects.toThrow('Entity Not Found using ID invalid-id');
      expect(repository.delete(new UniqueEntityId(validUuid))).rejects.toThrow(`Entity Not Found using ID ${validUuid}`); 
    });

    it('should delete an entity when id is provided', async () => {
      const entity = new StubEntity({ name: 'some value', price: 5 });
      await repository.insert(entity);

      await repository.delete(entity.id);

      expect(repository.items).toHaveLength(0);
    });

    it('should delete an entity when uniqueId is provided', async () => {
      const entity = new StubEntity({ name: 'some value', price: 5 });
      await repository.insert(entity);

      await repository.delete(entity.uniqueEntityId);

      expect(repository.items).toHaveLength(0);
    });
  });
});


class SubInMemorySearchableRepository extends InMemorySearchableRepository<StubEntity> {
  sortableFields: string[] = ['name'];

  protected applyFilter(
    items: StubEntity[],
    filter: string | null
  ): Promise<StubEntity[]> {
    if(!filter) {
      return Promise.resolve(items);
    }

    return Promise.resolve(items.filter(item => {
      return (
        item.props.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) || 
        item.props.price.toString() === filter
      );
    }));
  }
}

describe(`${repositorySearchableName} Searchable Unit Tests`, () => {
  let repository: SubInMemorySearchableRepository;

  beforeEach(() =>{
    repository = new SubInMemorySearchableRepository();
  });

  describe('applyFilter', () => {
    it('should return all items when filter param is null', async () => {
      const items = [new StubEntity({ name: 'some name', price: 5 })];
      const spyFilterMethod = jest.spyOn((items as any), 'filter');

      const itemsFiltered = await repository['applyFilter'](items, null);

      expect(itemsFiltered).toStrictEqual(items);
      expect(spyFilterMethod).not.toBeCalled();
    });

    it('should return empty array when filter param is not found', async () => {
      const items = [
        new StubEntity({ name: 'some name', price: 5 }),
        new StubEntity({ name: 'filtered name', price: 5 })
      ];
      const spyFilterMethod = jest.spyOn((items as any), 'filter');

      const itemsFiltered = await repository['applyFilter'](items, 'not found name');

      expect(itemsFiltered).toStrictEqual([]);
      expect(spyFilterMethod).toBeCalledTimes(1);
    });

    it('should return filtered items when filter param is provided', async () => {
      const items = [
        new StubEntity({ name: 'some name', price: 5 }),
        new StubEntity({ name: 'filtered name', price: 5 })
      ];
      const spyFilterMethod = jest.spyOn((items as any), 'filter');

      const itemsFiltered = await repository['applyFilter'](items, 'filtered name');

      expect(itemsFiltered).toStrictEqual([items[1]]);
      expect(spyFilterMethod).toBeCalledTimes(1);
    });

  });

  describe('applySort', () => {
    it('should all items when sort and sortDirection params are null', async () => {
      const items = [
        new StubEntity({ name: 'some name A', price: 1 }),
        new StubEntity({ name: 'some name B', price: 2 }),
        new StubEntity({ name: 'some name C', price: 3 })
      ];

      const itemsSorted = await repository['applySort'](items, null, null);

      expect(itemsSorted).toStrictEqual(items);
    });

    it('should items sorted when sort and sortDirection params are provided', async () => {
      repository.sortableFields = ['name'];

      const items = [
        new StubEntity({ name: 'some name A', price: 3 }),
        new StubEntity({ name: 'some name B', price: 2 }),
        new StubEntity({ name: 'some name C', price: 1 })
      ];

      const itemsSortedByAscName = await repository['applySort'](items, 'name', 'asc');
      const itemsSortedByDescName = await repository['applySort'](items, 'name', 'desc');

      expect(itemsSortedByAscName).toStrictEqual(items);
      expect(itemsSortedByDescName).toStrictEqual([...items.reverse()]);

    });
  });

  describe('applyPaginate', () => {
    it('should paginate items', async () => {
      const items = [
        new StubEntity({ name: 'some name A', price: 1 }),
        new StubEntity({ name: 'some name B', price: 2 }),
        new StubEntity({ name: 'some name C', price: 3 }),
        new StubEntity({ name: 'some name D', price: 4 }),
        new StubEntity({ name: 'some name E', price: 5 }),
        new StubEntity({ name: 'some name F', price: 6 })
      ];


      let itemsPaginated = await repository['applyPaginate'](items, 1, 2);
      expect(itemsPaginated).toStrictEqual([items[0], items[1]]);

      itemsPaginated = await repository['applyPaginate'](items, 1, 5);
      expect(itemsPaginated).toStrictEqual([items[0], items[1], items[2], items[3], items[4]]);


      itemsPaginated = await repository['applyPaginate'](items, 2, 2);
      expect(itemsPaginated).toStrictEqual([items[2], items[3]]);

      itemsPaginated = await repository['applyPaginate'](items, 2, 5);
      expect(itemsPaginated).toStrictEqual([items[5]]);

      itemsPaginated = await repository['applyPaginate'](items, 2, 6);
      expect(itemsPaginated).toStrictEqual([]);
    });
  });

  describe(`${repositorySearchableMethodSearchName}`, () => {
    it('should apply only paginate when other params are null', async () => {
      const entity = new StubEntity({ name: 'some name', price: 1 });
      const items = Array(16).fill(entity);
      repository.items = items;

      const output = await repository.search(new SearchParams());
      
      expect(output).toStrictEqual(new SearchResult ({
        items: Array(15).fill(entity),
        total: 16,
        currentPage: 1,
        perPage: 15,
        sort: null,
        sortDirection: null,
        filter: null
      }))
    });

    it('should apply paginate and filter when others params are null', async () => {
      const items = [
        new StubEntity({ name: 'some filtered name', price: 1 }),
        new StubEntity({ name: 'some Filtered name', price: 2 }),
        new StubEntity({ name: 'some other name', price: 3 }),
        new StubEntity({ name: 'some other name', price: 4 }),
        new StubEntity({ name: 'some FILTERED name', price: 5 }),
        new StubEntity({ name: 'some other name', price: 6 })
      ];
      
      repository.items = items;

      const outputFilteredPage1 = await repository.search(new SearchParams({
        page: 1,
        perPage: 2,
        filter: 'some filtered name'
      }));

      const outputFilteredPage2 = await repository.search(new SearchParams({
        page: 2,
        perPage: 2,
        filter: 'some filtered name'
      }));
      
      expect(outputFilteredPage1).toStrictEqual(new SearchResult ({
        items: [items[0], items[1]],
        total: 3,
        currentPage: 1,
        perPage: 2,
        sort: null,
        sortDirection: null,
        filter: 'some filtered name'
      }))

      expect(outputFilteredPage2).toStrictEqual(new SearchResult ({
        items: [items[4]],
        total: 3,
        currentPage: 2,
        perPage: 2,
        sort: null,
        sortDirection: null,
        filter: 'some filtered name'
      }))
    });

    it('should apply paginate and sort when others params are null', async () => {
      repository.sortableFields = ['name'];

      const items = [
        new StubEntity({ name: 'some name F', price: 1 }),
        new StubEntity({ name: 'some name E', price: 2 }),
        new StubEntity({ name: 'some name D', price: 3 }),
        new StubEntity({ name: 'some name C', price: 4 }),
        new StubEntity({ name: 'some name B', price: 5 }),
        new StubEntity({ name: 'some name A', price: 6 })
      ];
      
      repository.items = items;

      const outputSorted = await repository.search(new SearchParams({
        page: 1,
        perPage: 6,
        sort: 'name'
      }));
      
      expect(outputSorted).toStrictEqual(new SearchResult ({
        items: items,
        total: 6,
        currentPage: 1,
        perPage: 6,
        sort: 'name',
        sortDirection:'asc',
        filter: null
      }));
    });

    it('should apply paginate and sort when sortDirection is provided and others params are null', async () => {
      repository.sortableFields = ['price'];

      const items = [
        new StubEntity({ name: 'some name', price: 1 }),
        new StubEntity({ name: 'some name', price: 2 }),
        new StubEntity({ name: 'some name', price: 3 }),
        new StubEntity({ name: 'some name', price: 4 }),
        new StubEntity({ name: 'some name', price: 5 }),
        new StubEntity({ name: 'some name', price: 6 })
      ];
      
      repository.items = items;

      const outputSortedAsc = await repository.search(new SearchParams({
        page: 1,
        perPage: 6,
        sort: 'price',
        sortDirection: 'asc'
      }));

      const outputSortedDesc = await repository.search(new SearchParams({
        page: 1,
        perPage: 6,
        sort: 'price',
        sortDirection: 'desc'
      }));
      
      expect(outputSortedAsc).toStrictEqual(new SearchResult ({
        items: items,
        total: 6,
        currentPage: 1,
        perPage: 6,
        sort: 'price',
        sortDirection:'asc',
        filter: null
      }));

      expect(outputSortedDesc).toStrictEqual(new SearchResult ({
        items: [...items.reverse()],
        total: 6,
        currentPage: 1,
        perPage: 6,
        sort: 'price',
        sortDirection:'desc',
        filter: null
      }));
    });

    it('should search apply paginate, filter, sort, sort Direction when all params is provided', async () => {
      repository.sortableFields = ['price'];

      const items = [
        new StubEntity({ name: 'some filtered name', price: 1 }),
        new StubEntity({ name: 'some filtered name', price: 2 }),
        new StubEntity({ name: 'some filtered name', price: 3 }),
        new StubEntity({ name: 'some other name', price: 4 }),
        new StubEntity({ name: 'some other name', price: 5 }),
        new StubEntity({ name: 'some other name', price: 6 })
      ];
      
      repository.items = items;

      const outputSortedAsc = await repository.search(new SearchParams({
        page: 1,
        perPage: 6,
        sort: 'price',
        sortDirection: 'asc',
        filter: 'some filtered name'
      }));

      const outputSortedDesc = await repository.search(new SearchParams({
        page: 1,
        perPage: 6,
        sort: 'price',
        sortDirection: 'desc',
        filter: 'some filtered name'
      }));
      
      expect(outputSortedAsc).toStrictEqual(new SearchResult ({
        items: [items[0], items[1], items[2]],
        total: 3,
        currentPage: 1,
        perPage: 6,
        sort: 'price',
        sortDirection:'asc',
        filter: 'some filtered name'
      }));

      expect(outputSortedDesc).toStrictEqual(new SearchResult ({
        items: [items[2], items[1], items[0]],
        total: 3,
        currentPage: 1,
        perPage: 6,
        sort: 'price',
        sortDirection:'desc',
        filter: 'some filtered name'
      }));
    });
  });
});

