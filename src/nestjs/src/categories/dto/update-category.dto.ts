import { UpdateCategoryUseCase } from '@fc/Core_AdmCatalogoVideo/category/application';
export class UpdateCategoryDto implements UpdateCategoryUseCase.Input {
  id: string;
  name: string;
  description?: string;
  isActive?: boolean;
}
