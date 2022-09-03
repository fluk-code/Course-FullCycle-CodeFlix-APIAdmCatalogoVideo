import { CreateCategoryUseCase } from '@fc/Core_AdmCatalogoVideo/category/application';
export class CreateCategoryDto implements CreateCategoryUseCase.Input {
  name: string;
  description?: string;
  isActive?: boolean;
}
