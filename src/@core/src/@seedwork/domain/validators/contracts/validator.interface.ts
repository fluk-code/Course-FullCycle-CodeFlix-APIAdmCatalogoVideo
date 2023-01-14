export interface IValidators<PropsValidates = string> {
  errors: Error.FieldsErrors;

  isValid: (input: PropsValidates) => boolean;

  validate: (input: PropsValidates) => void;
  instanceError: () => Error.InvalidFieldError;
}