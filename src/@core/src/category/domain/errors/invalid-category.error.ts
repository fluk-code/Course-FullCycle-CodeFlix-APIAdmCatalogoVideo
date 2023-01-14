import InvalidPropsError from '../../../@seedwork/domain/errors/invalid-props.error';

export default class InvalidCategoryError extends InvalidPropsError {
  constructor(stack: Error.FieldsErrors) {
    super(stack);
    this.name = InvalidCategoryError.name;
  }
}
