# TypeScript Compiler Pipeline

The sequence `tsc` runs internally to turn a `.ts` file into JavaScript. Each stage has a distinct job.

```
.ts source → Lexer → Parser → Binder → Checker → Emitter → .js / .d.ts / .js.map
```

---

## 1. Lexer (Scanner)

Reads raw source code character by character and groups it into **tokens** — the smallest meaningful chunks.

```ts
const x: number = 5;
```

becomes tokens like: `const`, `x`, `:`, `number`, `=`, `5`, `;`

No understanding of meaning yet — just "this is a keyword, this is an identifier, this is punctuation."

---

## 2. Parser

Takes the flat token stream and builds an **AST (Abstract Syntax Tree)** — a tree structure that captures grammar and nesting.

It knows `const x: number = 5;` is a `VariableDeclaration` node containing:

- an `Identifier` (`x`)
- a `TypeAnnotation` (`number`)
- an `Initializer` (`5`)

This is pure syntax. It doesn't know if `number` is a real type, or if `x` was already declared elsewhere.

### Example — why this isn't enough on its own

```ts
let x = 5;

function fn() {
  let x = 5;
  console.log(x); // which x is this?
}

console.log(x); // which x is this?
```

The Parser has no concept of scope — it just sees four nodes that happen to say `x`. That's why the **Binder** exists.

---

## 3. Binder

Walks the AST and builds **symbols**, connecting each `Symbol` object to its declaration. This is where scoping gets resolved.

### Example

```ts
let x = 5; // x → Symbol A (global scope)

function fn() {
  let x = 5; // x → Symbol B (function scope)
  console.log(x); // links to Symbol B (nearest scope wins)
}

console.log(x); // links to Symbol A (global)
```

No type-checking happens yet — this stage is purely about wiring names to their correct declarations.

---

## 4. Checker

This is the part that makes TypeScript _TypeScript_. It walks the AST + symbols and:

- infers types
- checks assignability (can I assign a `string` to a `number`?)
- resolves generics
- checks interface compatibility

### Example

```ts
let x: number = 5;

function fn() {
  let x: string = "hello";
  console.log(x.toUpperCase()); // OK — x is a string here
}

x = "word"; // ERROR — x is the global, number-typed x
```

---

## 5. Emitter

All type-checking is complete before this stage. The Emitter walks the tree one final time and produces plain JavaScript — types don't exist at runtime, so they're stripped out.

### Example

```ts
let x: string = "hello";
```

becomes

```js
let x = "hello";
```

### Output files

| File      | Contents                                                                                        |
| --------- | ----------------------------------------------------------------------------------------------- |
| `.js`     | Compiled JavaScript — the code that actually runs                                               |
| `.d.ts`   | Type declarations only (no logic) — lets other TS projects import your code with full type info |
| `.js.map` | Source map — links compiled JS back to the original `.ts` lines for debugging                   |

---

## One-line mental model

| Stage   | Job                                   |
| ------- | ------------------------------------- |
| Lexer   | Break it into words                   |
| Parser  | Arrange the words into a tree         |
| Binder  | Figure out who's who                  |
| Checker | Make sure nobody's breaking the rules |
| Emitter | Throw away the rules, ship the JS     |
