import { InvalidUuidError } from '../../../../@seedwork/errors/invalid.uuid.error';
import { UniqueEntityId } from '../unique-entity-id.vo';
import { validate } from 'uuid';

describe(`${UniqueEntityId} unit test`, () => {
  // function spyValidateMethod() {
  //   return jest.spyOn(UniqueEntityId.prototype as any, 'validate');
  // }
  const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate')
  
  beforeEach(() => {
    // jest.clearAllMocks();
    // validateSpy.mockClear();
    // Podemos tambem configurar para que o jest limpe os mocks em json.config.ts -> clearMocks: true
  })

  it('should throw error when uuid is invalid', () => {
    // const validateSpy = spyValidateMethod();

    expect(() => new UniqueEntityId('invalid-uuid')).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
    expect(validateSpy).toHaveBeenCalledTimes(1);
  })
  
  it('should accept an uuid passed in constructor', () => {
    // const validateSpy = spyValidateMethod();
    
    const validUuid = 'cda16f22-e6ec-4ea3-a804-3aeee4b92581';
    const valueObject = new UniqueEntityId(validUuid);
    expect(valueObject.value).toBe(validUuid);
    expect(validateSpy).toHaveBeenCalled();
    expect(validateSpy).toHaveBeenCalledTimes(1);
  })

  it('should generate a valid uuid is not passed in constructor', () => {
    // const validateSpy = spyValidateMethod();
    
    const valueObject = new UniqueEntityId();
    expect(validate(valueObject.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
    expect(validateSpy).toHaveBeenCalledTimes(1);
  })
})
