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

# Union and Any

## Union

A union type describes a value that can be one of several types. It's declared by separating each type with a pipe (`|`) symbol.

```ts
let value: string | number;
```

The variable is restricted to only the types listed in the union.

## Any

`any` disables TypeScript's type-checking. A variable typed `any` can be assigned any value, reassigned to any other type, and have any method or property accessed on it — without the compiler checking any of it.

```ts
let value: any;
value = "hello";
value = 42;
value.whatever(); // no error, even though this would crash at runtime
```

# Type Aliases

A `type` alias gives a name to any type — primitives, unions, objects, functions, anything. Once named, you reuse it instead of repeating the shape everywhere.

```ts
type ID = string | number;

let userId: ID = 101;
let productId: ID = "SKU-42";
```

Type aliases don't create a new type — they're just a label pointing to an existing type definition. Renaming the alias doesn't change what it represents underneath.

---

# Interfaces

An `interface` describes the **shape of an object** — what properties and methods it must have, and their types. Unlike `type`, interfaces are specifically built for describing object structures (and can be extended).

```ts
interface User {
  id: number;
  name: string;
  isActive: boolean;
}

const anjum: User = {
  id: 1,
  name: "Anjum",
  isActive: true,
};
```

### Interface vs Type Alias (the practical difference)

```ts
interface Animal {
  name: string;
}
interface Animal {
  age: number; // merges automatically with the one above
}
// Animal now requires both name AND age

type Car = { brand: string };
type Car = { year: number }; // ERROR — type aliases can't be redeclared
```

Interfaces can be **declared multiple times and get merged** — TypeScript combines them into one. Type aliases cannot; declaring the same type alias twice is an error. This is the main practical reason libraries often prefer `interface` for public object shapes (so consumers can extend them later).

---

# Literal Types

A literal type restricts a variable to one **exact, specific value** — not just a general type like `string`, but the literal `"pending"` itself.

```ts
let status: "pending";
status = "pending"; // OK
status = "done"; // ERROR — only "pending" is allowed
```

This becomes genuinely useful combined with a union (which you already know):

```ts
let reqStatus: "pending" | "success" | "error";
reqStatus = "success"; // OK
reqStatus = "loading"; // ERROR — not in the allowed set
```

Literal types are the building block behind how unions like `"pending" | "success" | "error"` actually work under the hood — each option in that union IS a literal type.

---

# Tuples

A tuple is an array with a **fixed number of elements**, where each position has its own specific type. Regular arrays don't care about position or length — tuples do.

```ts
let user: [string, number];
user = ["Anjum", 25]; // OK — string first, number second
user = [25, "Anjum"]; // ERROR — wrong order
user = ["Anjum", 25, true]; // ERROR — too many elements
```

### Example — why this matters

```ts
// Without a tuple, order isn't enforced:
let coordinates: number[] = [10, 20]; // fine, but so is [1,2,3,4,5]

// With a tuple, exactly 2 numbers, in this order, nothing more:
let point: [number, number] = [10, 20];
```

Tuples are commonly seen in things like `useState()` in React — it returns exactly `[value, setterFunction]`, always in that order, always that shape.

---

# Intersection Types

An intersection type **combines multiple types into one**, using the `&` symbol. The resulting type must satisfy ALL combined types at once — the opposite of union (which only needs ONE of the listed types).

```ts
type Person = {
  name: string;
};

type Employee = {
  employeeId: number;
};

type StaffMember = Person & Employee;

const staff: StaffMember = {
  name: "Anjum",
  employeeId: 1001,
  // both properties are REQUIRED — missing either one is an error
};
```

### Union vs Intersection (quick contrast)

```ts
type A = { x: number };
type B = { y: number };

let u: A | B; // needs to satisfy A OR B
let i: A & B; // needs to satisfy A AND B — must have both x and y
```
