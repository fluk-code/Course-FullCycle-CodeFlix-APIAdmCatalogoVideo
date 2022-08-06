import { UniqueEntityId } from '../value-objects/unique-entity-id.vo';
import Entity from './entity'

import { validate as uuidValidate } from 'uuid';

class StubEntity extends Entity<{prop1: string, prop2: number}> {}

describe(`${Entity.name} Unit Tests`, () => {
  it('should set props and id', () => {
    const arrange = {
      prop1: 'some value',
      prop2: 10
    }
    const stub = new StubEntity(arrange);

    expect(stub.props).toStrictEqual(arrange);
    expect(stub.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(stub.id).not.toBeNull();
    expect(uuidValidate(stub.id)).toBeTruthy();
  });

  it('should accept a valid uuid', () => {
    const uniqueEntityId = new UniqueEntityId();
    const arrange = {
      prop1: 'some value',
      prop2: 10
    };

    const stub = new StubEntity(arrange, uniqueEntityId );

    expect(stub.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(stub.id).toBe(uniqueEntityId.value);
  });

  it('should convert a entity to a JavaScript Object', () => {
    const uniqueEntityId = new UniqueEntityId();
    const arrange = {
      prop1: 'some value',
      prop2: 10
    };

    const stub = new StubEntity(arrange, uniqueEntityId );

    expect(stub.toJson()).toStrictEqual({
      id: stub.id,
      ...arrange
    })
  });
});
