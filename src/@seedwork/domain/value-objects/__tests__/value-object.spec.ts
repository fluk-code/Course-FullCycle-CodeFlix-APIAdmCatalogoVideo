import ValueObject from '../value-object';


class StubValueObject extends ValueObject {

}

describe(`${ValueObject.name} Unit Tests`, () => {

  it('should set value', () => {
    const date = new Date()
    const possibleValues = [
      '',
      'some string',
      0,
      1,
      10,
      true,
      false,
      date,
      {prop: 'string value'}
    ]

    possibleValues.forEach(value => {
      const vo = new StubValueObject(value);
      expect(vo.value).toBe(value);
    });
  });

  it('should any typeof value convert to a string', () => {
    const date = new Date();
    const possibleValues = [
      { inputValue: '', outputValue: ''},
      { inputValue: 'some string', outputValue: 'some string'},
      { inputValue: 0, outputValue: '0'},
      { inputValue: 1, outputValue: '1'},
      { inputValue: 10, outputValue: '10'},
      { inputValue: true, outputValue: 'true'},
      { inputValue: false, outputValue: 'false'},
      { inputValue: date, outputValue: date.toString()},
      { inputValue: {prop1: 'some value', prop2: 0}, outputValue: JSON.stringify({prop1: 'some value', prop2: 0})},
    ]

    possibleValues.forEach(value => {
      const vo = new StubValueObject(value.inputValue);
      expect(vo + '').toBe(value.outputValue);
    });
  });

  it('should be a immutable value', () => {
    let obj = {
      prop1: 'some value', 
      deep: {
        prop2: 'some value',
        prop3: new Date()
      }
    };

    const vo = new StubValueObject(obj);

    expect(() => (vo as any).value.prop1 = 'change value')
      .toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'");

    expect(() => (vo as any).value.deep.prop2 = 'change value')
    .toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'");
    
    expect(vo.value.deep.prop3).toBeInstanceOf(Date)
  });
  
  
});
