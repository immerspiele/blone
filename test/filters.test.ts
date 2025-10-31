import { describe, expect, test } from 'vitest';
import { parse } from '../src/parse';
import { render } from '../src/render';
import * as filters from '../src/filters';
import { TemplateContext } from '../src/types';

describe('Filters', () => {
  const context: TemplateContext = [{ ...filters }];

  test('uppercase filter', () => {
    const template = parse('Hello, {name|uppercase}!');
    const result = render(template, { name: 'world' }, context);
    expect(result).toBe('Hello, WORLD!');
  });

  test('lowercase filter', () => {
    const template = parse('Hello, {name|lowercase}!');
    const result = render(template, { name: 'WORLD' }, context);
    expect(result).toBe('Hello, world!');
  });

  test('trim filter', () => {
    const template = parse('Hello, {name|trim}!');
    const result = render(template, { name: '  world  ' }, context);
    expect(result).toBe('Hello, world!');
  });

  test('chained filters', () => {
    const template = parse('Hello, {name|trim|uppercase}!');
    const result = render(template, { name: '  world  ' }, context);
    expect(result).toBe('Hello, WORLD!');
  });
});
