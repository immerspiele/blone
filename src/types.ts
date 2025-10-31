export type FilterCall = [
  name: string,
  ...args: string[],
];

export type StatementNode = [
  identifier: string,
  ...filters: FilterCall[],
];

export type StringNode = string;

export type TemplateNode =
  | StatementNode
  | StringNode;

export type Template = TemplateNode[];

export type FilterFunction = (
  value: any,
  ...args: string[]
) => any;

export type TemplateContext = [
  filters: Record<string, FilterFunction>,
];

export type Variables = {
  [key: string]: any;
};
