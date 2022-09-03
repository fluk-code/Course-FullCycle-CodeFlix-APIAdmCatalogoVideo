import {
  CreateCategoryUseCase,
  UpdateCategoryUseCase,
} from '@fc/Core_AdmCatalogoVideo/category/application';
import { CategoriesController } from './categories.controller';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

const CategoriesControllerName = CategoriesController.name;

describe(`${CategoriesControllerName} Unit Tests`, () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    controller = new CategoriesController();
  });

  it('should create a category', () => {
    const expectedOutput: CreateCategoryUseCase.Output = {
      id: 'some-valid-uuid',
      name: 'some name',
      description: 'some description',
      isActive: true,
      createdAt: new Date(),
    };

    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(expectedOutput),
    };

    const input: CreateCategoryDto = {
      name: 'some name',
      description: 'some description',
      isActive: true,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    controller['createUseCase'] = mockCreateUseCase;
    const categoryOutput = controller.create(input);

    expect(mockCreateUseCase.execute).toBeCalledTimes(1);
    expect(mockCreateUseCase.execute).toBeCalledWith(input);
    expect(categoryOutput).toStrictEqual(expectedOutput);
  });

  it('should update a category', () => {
    const id = 'some-valid-uuid';
    const expectedOutput: UpdateCategoryUseCase.Output = {
      id,
      name: 'updated name',
      description: 'updated description',
      isActive: true,
      createdAt: new Date(),
    };

    const mockUpdateUseCase = {
      execute: jest.fn().mockReturnValue(expectedOutput),
    };

    const input: UpdateCategoryDto = {
      name: 'some name',
      description: 'some description',
      isActive: true,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    controller['updateUseCase'] = mockUpdateUseCase;
    const categoryOutput = controller.update(id, input);

    expect(mockUpdateUseCase.execute).toBeCalledTimes(1);
    expect(mockUpdateUseCase.execute).toBeCalledWith({
      id,
      ...input,
    });
    expect(categoryOutput).toStrictEqual(expectedOutput);
  });
});
