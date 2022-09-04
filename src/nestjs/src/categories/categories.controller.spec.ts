import {
  CategoryOutputDTO,
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  FindAllCategoriesUseCase,
  FindCategoryUseCase,
  UpdateCategoryUseCase,
} from '@fc/Core_AdmCatalogoVideo/category/application';
import { SortDirection } from '@fc/Core_AdmCatalogoVideo/dist/@seedwork/domain/repository';
import { CategoriesController } from './categories.controller';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

const CategoriesControllerName = CategoriesController.name;

describe(`${CategoriesControllerName} Unit Tests`, () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    controller = new CategoriesController();
  });

  it('should create a category', async () => {
    const expectedOutput: CreateCategoryUseCase.Output = {
      id: 'some-valid-uuid',
      name: 'some name',
      description: 'some description',
      isActive: true,
      createdAt: new Date(),
    };

    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };

    const input: CreateCategoryDto = {
      name: 'some name',
      description: 'some description',
      isActive: true,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    controller['createUseCase'] = mockCreateUseCase;
    const categoryOutput = await controller.create(input);

    expect(mockCreateUseCase.execute).toBeCalledTimes(1);
    expect(mockCreateUseCase.execute).toBeCalledWith(input);
    expect(categoryOutput).toStrictEqual(expectedOutput);
    expect(controller.create(input)).toBeInstanceOf(Promise<CategoryOutputDTO>);
  });

  it('should update a category', async () => {
    const id = 'some-valid-uuid';
    const expectedOutput: UpdateCategoryUseCase.Output = {
      id,
      name: 'updated name',
      description: 'updated description',
      isActive: true,
      createdAt: new Date(),
    };

    const mockUpdateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };

    const input: UpdateCategoryDto = {
      name: 'some name',
      description: 'some description',
      isActive: true,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    controller['updateUseCase'] = mockUpdateUseCase;
    const categoryOutput = await controller.update(id, input);

    expect(mockUpdateUseCase.execute).toBeCalledTimes(1);
    expect(mockUpdateUseCase.execute).toBeCalledWith({
      id,
      ...input,
    });
    expect(categoryOutput).toStrictEqual(expectedOutput);
    expect(controller.update(id, input)).toBeInstanceOf(
      Promise<CategoryOutputDTO>,
    );
  });

  it('should delete a category', async () => {
    const expectedOutput = undefined;

    const mockDeleteUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };

    const id = 'some-valid-uuid';
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    controller['deleteUseCase'] = mockDeleteUseCase;
    const categoryOutput = await controller.remove(id);

    expect(mockDeleteUseCase.execute).toBeCalledTimes(1);
    expect(mockDeleteUseCase.execute).toBeCalledWith({ id });
    expect(categoryOutput).toStrictEqual(expectedOutput);
    expect(controller.remove(id)).toBeInstanceOf(Promise);
  });

  it('should find a category', async () => {
    const id = 'some-valid-uuid';
    const expectedOutput: FindCategoryUseCase.Output = {
      id,
      name: 'updated name',
      description: 'updated description',
      isActive: true,
      createdAt: new Date(),
    };

    const mockFindUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    controller['findUseCase'] = mockFindUseCase;
    const categoryOutput = await controller.findOne(id);

    expect(mockFindUseCase.execute).toBeCalledTimes(1);
    expect(mockFindUseCase.execute).toBeCalledWith({ id });
    expect(categoryOutput).toStrictEqual(expectedOutput);
    expect(controller.findOne(id)).toBeInstanceOf(Promise<CategoryOutputDTO>);
  });

  it('should search a category', async () => {
    const id = 'some-valid-uuid';
    const expectedOutput: FindAllCategoriesUseCase.Output = {
      items: {
        id,
        name: 'some name',
        description: 'some description',
        isActive: true,
        createdAt: new Date(),
      },
      currentPage: 1,
      lastPage: 1,
      perPage: 2,
      total: 1,
    };

    const mockFindAllUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };

    const searchParams: FindAllCategoriesUseCase.Input = {
      page: 1,
      perPage: 2,
      sort: 'some name',
      sortDirection: 'desc',
      filter: 'test',
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    controller['findAllUseCase'] = mockFindAllUseCase;
    const categoryOutput = await controller.search(searchParams);

    expect(mockFindAllUseCase.execute).toBeCalledTimes(1);
    expect(mockFindAllUseCase.execute).toBeCalledWith(searchParams);
    expect(categoryOutput).toStrictEqual(expectedOutput);
    expect(controller.search(searchParams)).toBeInstanceOf(
      Promise<CategoryOutputDTO[]>,
    );
  });
});
