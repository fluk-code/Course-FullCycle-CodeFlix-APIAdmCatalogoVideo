import CategoryRepository from '../../domain/repositories/category.repository';
import { CategoryOutputDTO, CategoryOutputMapper } from '../dto/category-output';
import IUseCase from '../../../@seedwork/application/use-case';

export default class UpdateCategoryUseCase implements IUseCase<Input, Output> {

  constructor(
    private readonly _categoryRepository: CategoryRepository.Repository
  ) {}

  async execute(input: Input): Promise<Output> {
    const entityCategory = await this._categoryRepository.findById(input.id);
    entityCategory.update(input.name, input.description);

    if(input.isActive === true) {
      entityCategory.activate();
    } else if(input.isActive === false) {
      entityCategory.deactivate();
    };

    await this._categoryRepository.update(entityCategory);

    return CategoryOutputMapper.toOutput(entityCategory);
  }
}

export type Input = {
  id: string,
  name: string;
  description?: string;
  isActive?: boolean;
}

export type Output = CategoryOutputDTO;