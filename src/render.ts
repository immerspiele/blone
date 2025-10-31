import { Template, TemplateContext, Variables } from './types';

export const defaultContext: TemplateContext = [{}];

export const render = (
  template: Template,
  variables: Variables,
  context: TemplateContext = defaultContext,
  strict: boolean = false,
): string => {
  return template
    .map((node) => {
      if (typeof node === 'string') {
        return node;
      }

      const [identifier, ...filters] = node;
      let value = variables[identifier];

      if (value === undefined && strict) {
        throw new Error(`Variable "${identifier}" is not defined.`);
      }

      for (const [filterName, ...args] of filters) {
        const filterFunction = context[0]?.[filterName];
        if (typeof filterFunction !== 'function') {
          if (strict) {
            throw new Error(`Filter "${filterName}" is not defined.`);
          } else {
            continue;
          }
        }
        value = filterFunction(value, ...args);
      }

      return value !== undefined ? String(value) : '';
    })
    .join('');
};
