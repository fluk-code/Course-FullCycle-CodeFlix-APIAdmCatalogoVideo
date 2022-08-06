import { deepFreeze } from './object';

describe('Util Object Unit test', () => {
  it('should deepFreeze not freeze a scalar value', () => {
    const str = deepFreeze('some string');
    const num = deepFreeze(10);
    const booleanTrue = deepFreeze(true);
    const booleanFalse = deepFreeze(false);
    
    expect(typeof str).toBe('string');
    expect(typeof num).toBe('number');
    expect(typeof booleanTrue).toBe('boolean');
    expect(typeof booleanFalse).toBe('boolean');
  });
  
  it('should deepFreeze be a immutable object', () => {
    let obj = deepFreeze(
      {
        prop1: 'some value', 
        deep: {
          prop2: 'some value',
          prop3: new Date()
        }
      }
    );

    expect(() => (obj.prop1 as any) = 'change value')
      .toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'");

    expect(() => (obj.deep.prop2 as any) = 'change value')
    .toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'");
    
    expect(obj.deep.prop3).toBeInstanceOf(Date)
  });
});
