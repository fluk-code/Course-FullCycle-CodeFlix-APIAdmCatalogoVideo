import { CreateCategoryUseCase } from '@fc/Core_AdmCatalogoVideo/category/application';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CreateCategoryDto } from './dto/create-category.dto';

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
    const cateoryOutput = controller.create(input);

    expect(mockCreateUseCase.execute).toBeCalledTimes(1);
    expect(mockCreateUseCase.execute).toBeCalledWith(input);
    expect(cateoryOutput).toStrictEqual(expectedOutput);
  });
});
