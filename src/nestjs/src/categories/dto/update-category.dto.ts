import { UpdateCategoryUseCase } from '@fc/Core_AdmCatalogoVideo/category/application';

type UpdateCategoryUseCaseInput = Omit<UpdateCategoryUseCase.Input, 'id'>;

export class UpdateCategoryDto implements UpdateCategoryUseCaseInput {
  name: string;
  description?: string;
  isActive?: boolean;
}
