declare namespace Error {
  export type FieldsErrors = {
    [field: string]: string[];
  };

  export type InvalidFieldError = {
    new (stack: FieldsErrors, message?: string): Error;
  };
}
