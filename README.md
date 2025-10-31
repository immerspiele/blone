# Blone
Blone is a lightweight string templating library for JavaScript and TypeScript. It allows you to create dynamic strings by embedding expressions within template literals.

## Features
- Simple and intuitive syntax
- Supports variable interpolation

## Installation
You can install Blone via npm:

```bash
npm install @immersive/blone
```

## Usage
Here's a basic example of how to use Blone:
```javascript
import { parse, render } from '@immersive/blone';
import * as filters from '@immersive/blone/filters';

const template = parse('Hello, {name|uppercase}!');
const result = render(template, { name: 'world' }, [{ ...filters }]);
console.log(result); // Hello, WORLD!
```
