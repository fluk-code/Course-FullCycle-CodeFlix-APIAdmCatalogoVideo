import { validateSync } from 'class-validator';

import { IValidators } from './contracts/validator.interface';

export default abstract class Validator<PropsValidates = string>
  implements IValidators<PropsValidates>
{
  errors!: Error.FieldsErrors;
  rules!: object;

  protected abstract instanceRules(data: PropsValidates): void;

  isValid(data: PropsValidates): boolean {
    this.instanceRules(data);
    const errors = validateSync(this.rules);
    this.errors = errors.reduce((previous, current) => {
      const field = current.property;
      previous[field] = Object
        .values(current.constraints as unknown as string[])
        .map((constraint) => constraint.replace(field, '').trim());
      return previous;
    }, {} as Error.FieldsErrors);
    return !errors.length;
  }

  validate(data: PropsValidates): void {
    const isValid = this.isValid(data);

    if (!isValid) {
      const instanceError = this.instanceError();
      throw new instanceError(this.errors);
    }
  }

  abstract instanceError(): Error.InvalidFieldError;
}
