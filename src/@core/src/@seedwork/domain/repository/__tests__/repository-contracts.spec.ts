import { SearchParams, SearchResult, SortDirection } from '../repository-contracts';

const searchParamsName = SearchParams.name;
const searchResultName = SearchResult.name;

describe(`${searchParamsName} Unit Tests`, () => {
  it('should define page property with correct values when data provided is invalid', () => {
    const params = new SearchParams();
    expect(params.page).toBe(1);

    const arrange = [
      {page: null, expect: 1},
      {page: undefined, expect: 1},
      {page: "", expect: 1},
      {page: "some string", expect: 1},
      {page: 0, expect: 1},
      {page: -1, expect: 1},
      {page: 5.5, expect: 1},
      {page: true, expect: 1},
      {page: false, expect: 1},
      {page: {}, expect: 1},
    ];

    arrange.forEach(i => {
      expect(new SearchParams({ page: i.page as number }).page).toBe(i.expect);
    })
  });

  it('should define page property with correct values when data is provided', () => {
    for(let countPage = 50; countPage > 0; countPage--){
      expect(new SearchParams({ page: countPage }).page).toBe(countPage);
    };
  });

  it('should define perPage property with correct values when data provided is invalid', () => {
    const params = new SearchParams();
    expect(params.perPage).toBe(15);

    const arrange = [
      {perPage: null, expect: 15},
      {perPage: undefined, expect: 15},
      {perPage: "", expect: 15},
      {perPage: "some string", expect: 15},
      {perPage: 0, expect: 15},
      {perPage: -1, expect: 15},
      {perPage: 5.5, expect: 15},
      {perPage: true, expect: 15},
      {perPage: false, expect: 15},
      {perPage: {}, expect: 15},
    ];

    arrange.forEach(i => {
      expect(new SearchParams({ perPage: i.perPage as number }).perPage).toBe(i.expect);
    })
  });

  it('should define perPage property with correct values when data is provided', () => {
    for(let countPerPage = 50; countPerPage > 0; countPerPage--){
      expect(new SearchParams({ perPage: countPerPage }).perPage).toBe(countPerPage);
    };
  });

  it('should define sort property with correct values when data provided is invalid', () => {
    const params = new SearchParams();
    expect(params.sort).toBeNull();

    const arrange = [
      {sort: null, expect: null},
      {sort: undefined, expect: null},
      {sort: "", expect: null},
      {sort: "some string", expect: "some string"},
      {sort: 0, expect: "0"},
      {sort: -1, expect: "-1"},
      {sort: 5.5, expect: "5.5"},
      {sort: true, expect: "true"},
      {sort: false, expect: "false"},
      {sort: {}, expect: "[object Object]"},
    ];

    arrange.forEach(i => {      
      expect(new SearchParams({ sort: i.sort as string }).sort).toBe(i.expect);
    })
  });

  it('should define sort property with correct values when data is provided', () => {
    expect(new SearchParams({ sort: "some string", }).sort).toBe("some string",);
  });

  it('should define sortDirection property with correct values when data provided is invalid', () => {
    let params = new SearchParams();
    expect(params.sortDirection).toBeNull();

    params = new SearchParams({sort: null});
    expect(params.sortDirection).toBeNull();

    params = new SearchParams({sort: undefined});
    expect(params.sortDirection).toBeNull();

    params = new SearchParams({sort: ""});
    expect(params.sortDirection).toBeNull();

    const arrange = [
      {sortDirection: null, expect: "asc"},
      {sortDirection: undefined, expect: "asc"},
      {sortDirection: "", expect: "asc"},
      {sortDirection: "some string", expect: "asc"},
      {sortDirection: 0, expect: "asc"},
      {sortDirection: -1, expect: "asc"},
      {sortDirection: 5.5, expect: "asc"},
      {sortDirection: true, expect: "asc"},
      {sortDirection: false, expect: "asc"},
      {sortDirection: {}, expect: "asc"},
    ];

    arrange.forEach(i => {      
      expect(new SearchParams({ sort: "valid sort", sortDirection: i.sortDirection as SortDirection }).sortDirection).toBe(i.expect);
    })
  });

  it('should define sortDirection property with correct values when data is provided', () => {
    const arrange = [
      {sortDirection: "asc", expect: "asc"},
      {sortDirection: "ASC", expect: "asc"},
      {sortDirection: "Asc", expect: "asc"},
      {sortDirection: "aSc", expect: "asc"},
      {sortDirection: "desc", expect: "desc"},
      {sortDirection: "DESC", expect: "desc"},
      {sortDirection: "Desc", expect: "desc"},
      {sortDirection: "dEsc", expect: "desc"},
    ];

    arrange.forEach(i => {      
      expect(new SearchParams({ sort: "valid sort", sortDirection: i.sortDirection as SortDirection }).sortDirection).toBe(i.expect);
    })
  });

  it('should define filter property with correct values when data provided is invalid', () => {
    const params = new SearchParams();
    expect(params.filter).toBeNull();

    const arrange = [
      {filter: null, expect: null},
      {filter: undefined, expect: null},
      {filter: "", expect: null as string},
      {filter: 0, expect: "0"},
      {filter: -1, expect: "-1"},
      {filter: 5.5, expect: "5.5"},
      {filter: true, expect: "true"},
      {filter: false, expect: "false"},
      {filter: {}, expect: "[object Object]"},
    ];

    arrange.forEach(i => {
      expect(new SearchParams({ filter: i.filter as string }).filter).toBe(i.expect);
    });
  });

  it('should define perPage property with correct values when data is provided', () => {
    const arrange = [
      {filter: "some filter", expect: "some filter"},
      {filter: { prop: 1 }, expect: '[object Object]'},
    ];

    arrange.forEach(i => {
      expect(new SearchParams({ filter: i.filter as string }).filter).toBe(i.expect);
    })
  });
});

describe(`${searchResultName} Searchable Unit Tests`, () => {
  test('Constructor properties', () => {
    let result = new SearchResult({
      items: ['some entity 1', 'some entity 2'] as any,
      total: 4,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDirection: null,
      filter: null,
    });

    expect(result.toJSON()).toStrictEqual({
      items: ['some entity 1', 'some entity 2'] as any,
      total: 4,
      currentPage: 1,
      lastPage: 2,
      perPage: 2,
      sort: null,
      sortDirection: null,
      filter: null,
    })

    result = new SearchResult({
      items: ['some entity 1', 'some entity 2'] as any,
      total: 4,
      currentPage: 1,
      perPage: 2,
      sort: "name",
      sortDirection: "asc",
      filter: "test",
    });

    expect(result.toJSON()).toStrictEqual({
      items: ['some entity 1', 'some entity 2'] as any,
      total: 4,
      currentPage: 1,
      lastPage: 2,
      perPage: 2,
      sort: "name",
      sortDirection: "asc",
      filter: "test",
    })
  })

  it('should set last_page 1 when perPage field is greater than total field', () => {
    const result = new SearchResult({
      items: ['some entity 1', 'some entity 2'] as any,
      total: 4,
      currentPage: 1,
      perPage: 15,
      sort: null,
      sortDirection: null,
      filter: null,
    });

    expect(result.toJSON()).toStrictEqual({
      items: ['some entity 1', 'some entity 2'] as any,
      total: 4,
      currentPage: 1,
      lastPage: 1,
      perPage: 15,
      sort: null,
      sortDirection: null,
      filter: null,
    })
  });

  test('last_page property when total is not a multiple of perPage', () => {
    const result = new SearchResult({
      items: ['some entity 1', 'some entity 2'] as any,
      total: 101,
      currentPage: 1,
      perPage: 20,
      sort: null,
      sortDirection: null,
      filter: null,
    });

    expect(result.toJSON()).toStrictEqual({
      items: ['some entity 1', 'some entity 2'] as any,
      total: 101,
      currentPage: 1,
      lastPage: 6,
      perPage: 20,
      sort: null,
      sortDirection: null,
      filter: null,
    })
  });
});
