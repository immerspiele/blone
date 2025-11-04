# Blone
Blone is a **lightweight, tree-shakeable** string templating library for JavaScript and TypeScript. Designed with minimal client-side footprint in mind, Blone provides a simple yet powerful way to create dynamic strings through template strings with variable interpolation and filtering capabilities.

## Features
- **Lightweight**: Zero runtime dependencies and minimal bundle size.
- **Tree-shakeable**: Only include the parts of the library you use.
- **Easy to use**: Simple API for parsing and rendering templates.
- **Filter support**: Built-in filters for common string manipulations, with the ability to add custom filters.
- **TypeScript support**: Fully typed for better developer experience.

## Installation
You can install Blone via npm:

```bash
npm install @immerspiele/blone
```

or via yarn:

```bash
yarn add @immerspiele/blone
```

## Usage
Here's a basic example of how to use Blone:
```javascript
import { parse, render } from '@immerspiele/blone';
import * as filters from '@immerspiele/blone/filters';

const template = parse('Hello, {name|uppercase}!');
const result = render(template, { name: 'world' }, [{ ...filters }]);
console.log(result); // Hello, WORLD!
```
