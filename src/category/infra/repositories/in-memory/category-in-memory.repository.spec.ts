import { Category } from '../../../domain/entities/category';
import CategoryInMemoryRepository from './category-in-memory.repository';

describe(`${CategoryInMemoryRepository.name}`, () => {
  let repository: CategoryInMemoryRepository;
  let now: Date;

  beforeAll(() => {
    jest.useFakeTimers('modern').setSystemTime(new Date(2000, 1, 1, 0));
    now = new Date();
  })

  beforeEach(() =>{
    repository = new CategoryInMemoryRepository();
  });

    describe('applyFilter', () => {
      it('should return all items when filter param is null', async () => {
        const items = [
          new Category({ name: 'some name 1' }),
          new Category({ name: 'some name 2' })
        ];
        const spyFilterMethod = jest.spyOn((items as any), 'filter');
  
        const itemsFiltered = await repository['applyFilter'](items, null);
  
        expect(itemsFiltered).toStrictEqual(items);
        expect(spyFilterMethod).not.toBeCalled();
      });
  
      it('should return empty array when filter param is not found', async () => {
        const items = [
          new Category({ name: 'some name' }),
          new Category({ name: 'filtered name' })
        ];
        const spyFilterMethod = jest.spyOn((items as any), 'filter');
  
        const itemsFiltered = await repository['applyFilter'](items, 'not found name');
  
        expect(itemsFiltered).toStrictEqual([]);
        expect(spyFilterMethod).toBeCalledTimes(1);
      });
  
      it('should return filtered items when filter param is provided', async () => {
        const items = [
          new Category({ name: 'some name' }),
          new Category({ name: 'filtered name' })
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
          new Category({ name: 'some name A', createdAt: new Date(now.getTime() + 100) }),
          new Category({ name: 'some name B', createdAt: new Date(now.getTime() + 200) }),
          new Category({ name: 'some name C', createdAt: new Date(now.getTime() + 300) })
        ];
  
        const itemsSorted = await repository['applySort'](items, null, null);
  
        expect(itemsSorted).toStrictEqual(items);
      });
  
      it('should items sorted when sort and sortDirection params are provided', async () => {
        repository.sortableFields = ['name'];
        const items = [
          new Category({ name: 'some name A', createdAt: new Date(now.getTime() + 100) }),
          new Category({ name: 'some name B', createdAt: new Date(now.getTime() + 200) }),
          new Category({ name: 'some name C', createdAt: new Date(now.getTime() + 300) })
        ];
  
        const itemsSortedByAscName = await repository['applySort'](items, 'name', 'asc');
        const itemsSortedByDescName = await repository['applySort'](items, 'name', 'desc');
  
        expect(itemsSortedByAscName).toStrictEqual(items);
        expect(itemsSortedByDescName).toStrictEqual([...items.reverse()]);
      })
    });
});