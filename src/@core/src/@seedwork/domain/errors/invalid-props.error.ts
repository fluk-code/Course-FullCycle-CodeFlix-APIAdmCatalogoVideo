export default class InvalidPropsError extends Error {
  constructor(stack: Error.FieldsErrors, message = `${stack.length} field(s) with error(s)!`) {
    super(message);
    this.name = InvalidPropsError.name;
    this.stack = JSON.stringify(stack);
  }
}
