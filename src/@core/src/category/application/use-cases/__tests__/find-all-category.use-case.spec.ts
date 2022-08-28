import { Category } from '#category/domain/entities/category';
import CategoryRepository from '#category/domain/repositories/category.repository';
import CategoryInMemoryRepository from '#category/infra/repositories/in-memory/category-in-memory.repository';
import FindAllCategoriesUseCase from '../find-all-categories.use-case';

const findAllCategoriesUseCaseName = FindAllCategoriesUseCase.UseCase.name;

describe(`${findAllCategoriesUseCaseName} Unit Tests`, () => {
  let useCase: FindAllCategoriesUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new FindAllCategoriesUseCase.UseCase(repository);
  });

  afterEach(() => {
    repository.items = [];
  })

  it('should mapper toOutput method when items is empty', async () => {
    const result = new CategoryRepository.SearchResult({
      items: [],
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDirection: null,
      filter: null
    });

    const output = useCase['toOutput'](result);

    expect(output).toStrictEqual({
      items: [],
      total: 1,
      currentPage: 1,
      perPage: 2,
      lastPage: 1
    })
  });

  it('should mapper toOutput method when items as provided', async () => {
    const categoryTest = new Category({ name: 'some name'});
    const result = new CategoryRepository.SearchResult({
      items: [categoryTest],
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDirection: null,
      filter: null
    });

    const output = useCase['toOutput'](result);

    expect(output).toStrictEqual({
      items: [categoryTest.toJson()],
      total: 1,
      currentPage: 1,
      perPage: 2,
      lastPage: 1
    })
  });

  it('should return output using empty input with categories ordered by createdAt', async () => {
    const items = [
      new Category({ name: 'some name 1' }),
      new Category({ name: 'some name 2', createdAt: new Date(new Date().getTime() + 100)})
    ]

    repository.items = items;
    const output = await useCase.execute({});


    expect(output).toStrictEqual({
      items: [... items].map(item => item.toJson()),
      total: 2,
      currentPage: 1,
      perPage: 15,
      lastPage: 1
    })
  });

  it('should return output using pagination input, sort and filter', async () => {
    const createdAt = new Date();
    const items = [
      new Category({ name: 'some name A' }),
      new Category({ name: 'some name B', createdAt: new Date(createdAt.getTime() + 100)})
    ]

    repository.items = items;
    const output = await useCase.execute({});


    expect(output).toStrictEqual({
      items: [... items].map(item => item.toJson()),
      total: 2,
      currentPage: 1,
      perPage: 15,
      lastPage: 1
    })
  });

  it('should return output using pagination sort and filter', async () => {
    const items = [
      new Category({ name: 'some name A' }),
      new Category({ name: 'some name aaa' }),
      new Category({ name: 'some name AaA' }),
      new Category({ name: 'some name B' }),
      new Category({ name: 'some name C' }),
    ]

    repository.items = items;
    const outputPage1 = await useCase.execute({
      page: 1,
      perPage: 2,
      filter: 'some name a',
      sort: 'name'
    });

    const outputPage2 = await useCase.execute({
      page: 2,
      perPage: 2,
      filter: 'some name a',
      sort: 'name'
    });

    const outputDescPage1 = await useCase.execute({
      page: 1,
      perPage: 2,
      filter: 'some name a',
      sort: 'name',
      sortDirection: 'desc'
    });

    const outputDescPage2 = await useCase.execute({
      page: 2,
      perPage: 2,
      filter: 'some name a',
      sort: 'name',
      sortDirection: 'desc'
    });

    expect(outputPage1).toStrictEqual({
      items: [items[0].toJson(), items[1].toJson()],
      total: 3,
      currentPage: 1,
      perPage: 2,
      lastPage: 2
    });
    expect(outputPage2).toStrictEqual({
      items: [items[2].toJson()],
      total: 3,
      currentPage: 2,
      perPage: 2,
      lastPage: 2
    });
    expect(outputDescPage1).toStrictEqual({
      items: [items[0].toJson(), items[1].toJson()],
      total: 3,
      currentPage: 1,
      perPage: 2,
      lastPage: 2
    });
    expect(outputDescPage2).toStrictEqual({
      items: [items[2].toJson()],
      total: 3,
      currentPage: 2,
      perPage: 2,
      lastPage: 2
    });
  });
});