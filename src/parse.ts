import type { FilterCall, StatementNode, Template, TemplateNode } from './types';

const START_STATEMENT_CHAR_CODE = 0x7B; // {
const END_STATEMENT_CHAR_CODE = 0x7D; // }

// Statement syntax: variableIdentifier | filter1 | filter2(arg1, arg2) | ...
const parseStatement = (value: string): StatementNode => {
  const parts = value.split('|')
    .map((part) => part.trim())
    .filter((part) => part.length > 0);

  const filters: FilterCall[] = [];

  // Parse filters
  if (parts.length > 1) {
    for (let index = 1; index < parts.length; index += 1) {
      const filterPart = parts[index];
      const openParenIndex = filterPart.indexOf('(');
      const closeParenIndex = filterPart.indexOf(')');

      if (openParenIndex !== -1 && closeParenIndex !== -1 && closeParenIndex > openParenIndex) {
        const filterName = filterPart.slice(0, openParenIndex).trim();
        const argsString = filterPart.slice(openParenIndex + 1, closeParenIndex).trim();
        const args = argsString.split(',').map((arg) => arg.trim())

        filters.push([filterName, ...args]);
      } else {
        const filterName = filterPart.trim();
        filters.push([filterName]);
      }
    }
  }

  return [
    parts[0],
    ...filters,
  ];
};

export const parse = (template: string): Template => {
  const nodes: TemplateNode[] = [];

  let currentStatementStart = -1;
  let previousStatementEnd = 0;

  for (let index = 0; index < template.length; index += 1) {
    const charCode = template.charCodeAt(index);

    if (charCode === START_STATEMENT_CHAR_CODE) {
      if (currentStatementStart !== -1) {
        throw new Error(`Unexpected '{' at index ${index}. Nested statements are not allowed.`);
      }

      const stringNode = template.slice(previousStatementEnd, index);
      if (stringNode) {
        nodes.push(stringNode);
      }

      currentStatementStart = index;
    } else if (charCode === END_STATEMENT_CHAR_CODE) {
      if (currentStatementStart > -1) {
        const currentStatementEnd = index + 1;
        const statement = parseStatement(template.slice(currentStatementStart + 1, index).trim());

        nodes.push((statement));
        previousStatementEnd = currentStatementEnd;
        currentStatementStart = -1;
      }
    }
  }

  if (previousStatementEnd < template.length) {
    nodes.push(template.slice(previousStatementEnd));
  }

  return nodes;
};
