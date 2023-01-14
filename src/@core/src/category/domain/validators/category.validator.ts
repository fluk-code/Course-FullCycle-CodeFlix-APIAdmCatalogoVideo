import Validator from '../../../@seedwork/domain/validators/validator';
import { IsBoolean, IsDate, IsEmpty, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { CategoryProperties } from '../entities';
import InvalidCategoryError from '../errors/invalid-category.error';

export type CategoryValidateProperties = Required<CategoryProperties>;

class CategoryRules implements CategoryValidateProperties {
  
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((object, value) => value !== null)
  description: string;
  
  @IsBoolean()
  isActive: boolean;
  
  @IsDate()
  createdAt: Date;

  constructor({ name, description, createdAt, isActive}: CategoryValidateProperties) {
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.isActive = isActive;
  }
} 

export class CategoryValidator extends Validator<CategoryValidateProperties> {
  protected instanceRules(props: CategoryValidateProperties): void {
    this.rules = new CategoryRules(props);
  }

  instanceError(): Error.InvalidFieldError {
    return InvalidCategoryError;
  }
}