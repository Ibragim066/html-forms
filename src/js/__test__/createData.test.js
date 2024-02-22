import createData from '../Editor/createData';

describe('createData function', () => {
  it('should populate the object with key-value pairs from elements with dataset.id', () => {
    const array = [
      { dataset: { id: 'name' }, value: 'John' },
      { dataset: { id: 'age' }, value: '30' },
      { dataset: { id: 'city' }, value: 'New York' },
    ];
    const result = {};

    createData(array, result);
    expect(result).toEqual({ name: 'John', age: '30', city: 'New York' });
  });

  it('should not add elements without dataset.id to the object', () => {
    const array = [
      { dataset: { id: 'name' }, value: 'John' },
      { value: '30' },
    ];
    const result = {};

    createData(array, result);
    expect(result).toEqual({ name: 'John' });
  });

  it('should handle empty array gracefully', () => {
    const array = [];
    const result = {};

    createData(array, result);

    expect(result).toEqual({});
  });
});
