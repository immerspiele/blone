import { describe, it, expect } from 'vitest';
import { parse } from '../src/parse';

describe('parse', () => {
  it('should parse a simple template string', () => {
    const template = 'Hello, {name}!';
    const result = parse(template);

    expect(result).toEqual([
      'Hello, ',
      ['name'],
      '!',
    ]);
  });

  it('should handle a template string without statements', () => {
    const template = 'Just a plain string.';
    const result = parse(template);

    expect(result).toEqual([
      'Just a plain string.',
    ]);
  });

  it('should handle template with only statements', () => {
    const template = '{greeting}{name}';
    const result = parse(template);

    expect(result).toEqual([
      ['greeting'],
      ['name'],
    ]);
  });

  it('should parse a template string with filters', () => {
    const template = 'Value: {value | filter1 | filter2(arg1, arg2)}!';
    const result = parse(template);

    expect(result).toEqual([
      'Value: ',
      [
        'value',
        ['filter1'],
        ['filter2', 'arg1', 'arg2'],
      ],
      '!',
    ]);
  });

  it('should trim whitespace in statements and filters', () => {
    const template = 'Result: {   data   |   trim   |   format(  arg1 , arg2  )   }';
    const result = parse(template);

    expect(result).toEqual([
      'Result: ',
      [
        'data',
        ['trim'],
        ['format', 'arg1', 'arg2'],
      ],
    ]);
  });

  it('should allow } without matching {', () => {
    const template = 'This is a closing brace: } without opening.';
    const result = parse(template);

    expect(result).toEqual([
      'This is a closing brace: } without opening.',
    ]);
  });

  it('should handle multiple statements in a template', () => {
    const template = 'Hello, {name | capitalize}! Today is {day | uppercase}.';
    const result = parse(template);

    expect(result).toEqual([
      'Hello, ',
      [
        'name',
        ['capitalize'],
      ],
      '! Today is ',
      [
        'day',
        ['uppercase'],
      ],
      '.',
    ]);
  });

  it('should throw an error for nested statements', () => {
    const template = 'This is invalid: {outer {inner}}';

    expect(() => parse(template))
      .toThrowError('Unexpected \'{\' at index 24. Nested statements are not allowed.');
  });
});
