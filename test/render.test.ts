import { describe, it, expect } from 'vitest';
import { render } from '../src/render';
import { parse } from '../src/parse';
import { TemplateContext } from '../src/types';
import { esbuildVersion } from 'vite';

describe('render', () => {
  it('renders a simple template with variables', () => {
    const template = parse('Hello, {name}!');
    const variables = { name: 'World' };
    const result = render(template, variables);

    expect(result).toBe('Hello, World!');
  });

  it('applies filters to variables', () => {
    const template = parse('Value: {value | uppercase | slice(0,3)}');
    const variables = { value: 'test' };
    const context: TemplateContext = [
      {
        uppercase: (val: string) => val.toUpperCase(),
        slice: (val: string, start: string, end: string) => val.slice(Number(start), Number(end)),
      },
    ];

    const result = render(template, variables, context);
    expect(result).toBe('Value: TES');
  });

  describe('when variables are undefined', () => {
    it('throws an error for undefined variables in strict mode', () => {
      const template = parse('Hello, {name}!');
      const variables = {};

      expect(() => render(template, variables, undefined, true)).toThrowError(
        'Variable "name" is not defined.',
      );
    });

    it('renders empty string for undefined variables in non-strict mode', () => {
      const template = parse('Hello, {name}!');
      const variables = {};

      const result = render(template, variables, undefined, false);
      expect(result).toBe('Hello, !');
    });
  });

  describe('when filters are undefined', () => {
    it('throws an error for undefined filters in strict mode', () => {
      const template = parse('Value: {value | unknownFilter}');
      const variables = { value: 'test' };

      expect(() => render(template, variables, undefined, true)).toThrowError(
        'Filter "unknownFilter" is not defined.',
      );
    });

    it('skips undefined filters in non-strict mode', () => {
      const template = parse('Value: {value | unknownFilter}');
      const variables = { value: 'test' };

      const result = render(template, variables, undefined, false);
      expect(result).toBe('Value: test');
    });
  });
});
