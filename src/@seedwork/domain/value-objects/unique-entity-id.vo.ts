import { v4 as uuidV4, validate } from 'uuid';
import { InvalidUuidError } from '../../errors/invalid.uuid.error'

import ValueObject from './value-object';

export class UniqueEntityId extends ValueObject<string> {

  constructor (readonly id?: string) {    
    super(id || uuidV4());
    this.validate();
  }

  private validate(): void {
    const isValid = validate(this.value);
    if(!isValid){
      throw new InvalidUuidError();
    }
  }
}