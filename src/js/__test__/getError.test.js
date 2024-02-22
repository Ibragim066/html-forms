import getError from '../Editor/Tooltip/getError';

describe('getError function', () => {
  it('should return false if element has no name', () => {
    const el = { validity: { valueMissing: true }, name: '' };
    const errors = {
      test: { valueMissing: 'This field is required' },
    };
    expect(getError(el, errors)).toBe(false);
  });

  it('should return false if element is valid', () => {
    const el = { validity: { valid: true }, name: 'test' };
    const errors = {
      test: { valueMissing: 'This field is required' },
    };
    expect(getError(el, errors)).toBe(false);
  });

  it('should return the corresponding error message', () => {
    const el = { validity: { valueMissing: true }, name: 'test' };
    const errors = {
      test: { valueMissing: 'This field is required' },
    };
    expect(getError(el, errors)).toBe('This field is required');
  });

  it('should return false if no error key matches', () => {
    const el = { validity: { customError: true }, name: 'test' };
    const errors = {
      test: { valueMissing: 'This field is required' },
    };
    expect(getError(el, errors)).toBe(undefined);
  });
});
