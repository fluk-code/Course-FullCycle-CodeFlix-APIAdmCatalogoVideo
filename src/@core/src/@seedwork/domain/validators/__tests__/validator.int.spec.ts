import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

import { IValidators } from '../contracts/validator.interface';
import Validator from '../validator';

export class ErrorStub extends Error {
  constructor(stack: Error.FieldsErrors) {
    super('Error Stub');
    this.name = ErrorStub.name;
    this.stack = JSON.stringify(stack);
  }
}
interface PropsStub {
  uuid: string;
  number: number;
  string: string;
  boolean: boolean;
  optional?: string;
}

class RulesStub {
  @IsUUID('4')
  uuid: string;

  @IsNumber()
  number: number;

  @IsString()
  string: string;

  @IsBoolean()
  boolean: boolean;

  @IsOptional()
  @IsString()
  optional: string | undefined;

  constructor({ uuid, number, string, boolean, optional }: PropsStub) {
    this.uuid = uuid;
    this.number = number;
    this.string = string;
    this.boolean = boolean;
    this.optional = optional;
  }
}

class ValidatorStub extends Validator<PropsStub> {
  protected instanceRules(data: PropsStub): void {
    this.rules = new RulesStub(data);
  }

  instanceError(): Error.InvalidFieldError {
    return ErrorStub;
  }
}

describe('Validator Unit Test', () => {
  let validator: IValidators<PropsStub>;

  beforeEach(() => {
    validator = new ValidatorStub();
  });

  describe('isValid Method', () => {
    it('should return false when data provided is INVALID', () => {
      let isValid = validator.isValid({} as PropsStub);

      expect(isValid).toBeFalsy();
      expect(validator.errors).toStrictEqual({
        uuid: ['must be a UUID'],
        boolean: ['must be a boolean value'],
        number: ['must be a number conforming to the specified constraints'],
        string: ['must be a string'],
      });

      isValid = validator.isValid({
        uuid: 'invalid-uuid',
        number: 'invalid-number',
        string: 1,
        boolean: 'true',
      } as unknown as PropsStub);

      expect(isValid).toBeFalsy();
      expect(validator.errors).toStrictEqual({
        uuid: ['must be a UUID'],
        boolean: ['must be a boolean value'],
        number: ['must be a number conforming to the specified constraints'],
        string: ['must be a string'],
      });
    });

    it('should return true when data provided is valid', () => {
      const dataFake = {
        uuid: '95c7114d-a911-4df5-a48e-17b24373e57d',
        boolean: false,
        number: 1,
        string: 'some string',
      };

      const isValid = validator.isValid(dataFake);
      expect(isValid).toBeTruthy();
      expect(validator.errors).toStrictEqual({});
    });
  });

  describe('validate Method', () => {
    it('should throw instanceError when data provided is INVALID', () => {
      expect(() => validator.validate({} as PropsStub)).toThrow(ErrorStub);
      expect(() =>
        validator.validate({
          uuid: 'invalid-uuid',
          number: 'invalid-number',
          string: 1,
          boolean: 'invalid-boolean',
        } as unknown as PropsStub)
      ).toThrow(ErrorStub);
    });

    it('should NOT throw instanceError when data provided is valid', () => {
      const dataFake = {
        uuid: '95c7114d-a911-4df5-a48e-17b24373e57d',
        boolean: false,
        number: 1,
        string: 'some string',
      };

      expect(() => validator.validate(dataFake)).not.toThrow();
    });
  });
});
