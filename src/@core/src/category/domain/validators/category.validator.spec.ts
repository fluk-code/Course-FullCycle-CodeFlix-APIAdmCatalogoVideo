import { IValidators } from '#seedwork/domain/validators/contracts/validator.interface';
import InvalidCategoryError from '../errors/invalid-category.error';
import { CategoryValidateProperties, CategoryValidator } from './category.validator';


const categoryFake: CategoryValidateProperties = {
  name: 'some name',
  description: 'some descriptions',
  isActive: true,
  createdAt: new Date()
};

describe('CnpjValidator Unit Test', () => {
  let validator: IValidators<CategoryValidateProperties>;

  beforeEach(() => {
    validator = new CategoryValidator();
  });

  describe('isValid Method', () => {
    it('should return false when name props provided is NOT valid', () => {
      const arrange = [
        {
          value: { ...categoryFake, name: '' },
          expected: { name: ['should not be empty'] },
        },
        {
          value: { ...categoryFake, name: 1 },
          expected: { name: ['must be a string'] },
        },
        {
          value: { ...categoryFake, name: 0 },
          expected: { name: ['must be a string'] },
        },
        {
          value: { ...categoryFake, name: true },
          expected: { name: ['must be a string'] },
        },
        {
          value: { ...categoryFake, name: false },
          expected: { name: ['must be a string'] },
        },
        {
          value: { ...categoryFake, name: new Date() },
          expected: { name: ['must be a string'] },
        },
        {
          value: { ...categoryFake, name: { props: 'some name' } },
          expected: { name: ['must be a string'] },
        },
        {
          value: { ...categoryFake, name: {} },
          expected: { name: ['must be a string'] },
        },
        {
          value: { ...categoryFake, name: undefined },
          expected: { name: ['should not be empty', 'must be a string'] },
        },
        {
          value: { ...categoryFake, name: null },
          expected: { name: ['should not be empty', 'must be a string'] },
        },
      ];

      arrange.forEach((arrangeItems) => {
        const isValid = validator.isValid(arrangeItems.value as CategoryValidateProperties);
        expect(isValid).toBeFalsy();
        expect(validator.errors).toMatchObject(arrangeItems.expected);
      });
    });

    it('should return false when description provided is NOT valid', () => {
      const arrange = [
        {
          value: { ...categoryFake, description: '' },
          expected: { description: ['should not be empty'] },
        },
        {
          value: { ...categoryFake, description: 1 },
          expected: { description: ['must be a string'] },
        },
        {
          value: { ...categoryFake, description: 0 },
          expected: { description: ['must be a string'] },
        },
        {
          value: { ...categoryFake, description: true },
          expected: { description: ['must be a string'] },
        },
        {
          value: { ...categoryFake, description: false },
          expected: { description: ['must be a string'] },
        },
        {
          value: { ...categoryFake, description: new Date() },
          expected: { description: ['must be a string'] },
        },
        {
          value: { ...categoryFake, description: { props: 'some name' } },
          expected: { description: ['must be a string'] },
        },
        {
          value: { ...categoryFake, description: {} },
          expected: { description: ['must be a string'] },
        },
        {
          value: { ...categoryFake, description: undefined },
          expected: {
            description: ['should not be empty', 'must be a string'],
          },
        },
      ];

      arrange.forEach((arrangeItems) => {
        const isValid = validator.isValid(arrangeItems.value as CategoryValidateProperties);
        expect(isValid).toBeFalsy();
        expect(validator.errors).toMatchObject(arrangeItems.expected);
      });
    });

    it('should return false when isActive provided is NOT valid', () => {
      const arrange = [
        {
          value: { ...categoryFake, isActive: '' },
          expected: { isActive: ['must be a boolean value'] },
        },
        {
          value: { ...categoryFake, isActive: 1 },
          expected: { isActive: ['must be a boolean value'] },
        },
        {
          value: { ...categoryFake, isActive: 0 },
          expected: { isActive: ['must be a boolean value'] },
        },
        {
          value: { ...categoryFake, isActive: new Date() },
          expected: { isActive: ['must be a boolean value'] },
        },
        {
          value: { ...categoryFake, isActive: { props: 'some value' } },
          expected: { isActive: ['must be a boolean value'] },
        },
        {
          value: { ...categoryFake, isActive: {} },
          expected: { isActive: ['must be a boolean value'] },
        },
        {
          value: { ...categoryFake, isActive: 'invalid isActive' },
          expected: { isActive: ['must be a boolean value'] },
        },
        {
          value: { ...categoryFake, isActive: undefined },
          expected: { isActive: ['must be a boolean value'] },
        },
        {
          value: { ...categoryFake, isActive: null },
          expected: { isActive: ['must be a boolean value'] },
        },
      ];

      arrange.forEach((arrangeItems) => {
        const isValid = validator.isValid(arrangeItems.value as CategoryValidateProperties);
        expect(isValid).toBeFalsy();
        expect(validator.errors).toMatchObject(arrangeItems.expected);
      });
    });

    it('should return false when createdAt props provided is NOT valid', () => {
      const arrange = [
        {
          value: { ...categoryFake, createdAt: '' },
          expected: { createdAt: ['must be a Date instance'] },
        },
        {
          value: { ...categoryFake, createdAt: 'some string' },
          expected: { createdAt: ['must be a Date instance'] },
        },
        {
          value: { ...categoryFake, createdAt: 1 },
          expected: { createdAt: ['must be a Date instance'] },
        },
        {
          value: { ...categoryFake, createdAt: 0 },
          expected: { createdAt: ['must be a Date instance'] },
        },
        {
          value: { ...categoryFake, createdAt: true },
          expected: { createdAt: ['must be a Date instance'] },
        },
        {
          value: { ...categoryFake, createdAt: false },
          expected: { createdAt: ['must be a Date instance'] },
        },
        {
          value: { ...categoryFake, createdAt: { props: 'some createdAt' } },
          expected: { createdAt: ['must be a Date instance'] },
        },
        {
          value: { ...categoryFake, createdAt: {} },
          expected: { createdAt: ['must be a Date instance'] },
        },
        {
          value: { ...categoryFake, createdAt: undefined },
          expected: { createdAt: ['must be a Date instance'] },
        },
        {
          value: { ...categoryFake, createdAt: null },
          expected: { createdAt: ['must be a Date instance'] },
        },
      ];

      arrange.forEach((arrangeItems) => {
        const isValid = validator.isValid(arrangeItems.value as CategoryValidateProperties);
        expect(isValid).toBeFalsy();
        expect(validator.errors).toMatchObject(arrangeItems.expected);
      });
    });

    it('should return true when properties provided is correctly', () => {
      const isValid = validator.isValid(categoryFake);
      expect(isValid).toBeTruthy();
      expect(validator.errors).toStrictEqual({});
    })
  });
  

  describe('instanceError Method', () => {
    it('should return instance InvalidAddressError', () => {
      expect(validator.instanceError()).toBe(InvalidCategoryError);
    });
  });
});
