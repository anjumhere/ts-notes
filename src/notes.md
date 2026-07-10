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

---

# Type System Foundations & Core Types

## Union Types

A union type describes a value that can be one of several types. It's declared by separating each type with a pipe (`|`) symbol.

```ts
let reqStatus: "pending" | "success" | "error";
reqStatus = "pending"; // OK
// Assigning anything else (e.g., reqStatus = "loading") will throw a type error.
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

### Avoiding "any" (Using Unions Instead)

Instead of opting out of type-safety with `any`, we should narrow allowed values to specific types (e.g., `string | undefined`). This ensures types are checked even when handling fallback states.

```ts
const orders = ["10", "20", "30", "40"];
let currentOrders: string | undefined;

for (let order of orders) {
  if (order === "000") {
    currentOrders = order;
    break;
  }
  currentOrders = "100";
}
// Keeps type-safety intact while handling the "no match found" case gracefully.
```

## Type Aliases

A `type` alias gives a name to any type — primitives, unions, objects, functions, anything. Once named, you reuse it instead of repeating the shape everywhere.

```ts
type ID = string | number;

let userId: ID = 101;
let productId: ID = "SKU-42";
```

Type aliases don't create a new type — they're just a label pointing to an existing type definition.

---

# Interfaces & Class Implementation

An `interface` describes the **shape of an object** — what properties and methods it must have, and their types.

```ts
interface User {
  id: number;
  name: string;
  isActive: boolean;
}
```

### Interface vs Type Alias (Practical Differences)

1. **Declaration Merging:** Interfaces can be declared multiple times and automatically merge their fields. Type aliases cannot be redeclared.
   ```ts
   interface Animal {
     name: string;
   }
   interface Animal {
     age: number;
   } // Merged into { name: string; age: number; }
   ```
2. **Class `implements`:** Both can be implemented by a class, but a class can only implement a single, definite object shape. A class cannot implement a union type.

   ```ts
   // This works perfectly:
   interface Response {
     success: boolean;
     fail: boolean;
   }
   class Getres implements Response {
     success = true;
     fail = false;
   }

   // This fails at compile time:
   type UnionResponse = { ok: "success" } | { ok: "failure" };
   // class GetRes implements UnionResponse { ... } // ❌ Error: class can only implement a single definite shape
   ```

---

# Literal Types & Tuples

## Literal Types

A literal type restricts a variable to one **exact, specific value** — not just a general type like `string`, but the literal value itself.

```ts
let status: "pending" | "success" | "error";
```

## Tuples

A tuple is an array with a **fixed number of elements**, where each position has its own specific type.

```ts
let user: [string, number] = ["Anjum", 25]; // Exactly [string, number]
```

### Named Tuples

Named tuples improve code readability by self-documenting the purpose of each index.

```ts
const NamedTuple: [name: string, age: number] = ["anjum", 23];
```

### Readonly Tuples

Prevents modification of tuple index values.

```ts
const Tuples2: readonly [number, string] = [23, "one"];
// Tuples2[0] = 24; // ❌ Error: Index is read-only
```

---

# Intersection Types

An intersection type **combines multiple types into one**, using the `&` symbol. The resulting type must satisfy ALL combined types at once.

```ts
type Person = { name: string };
type Employee = { employeeId: number };
type StaffMember = Person & Employee; // Must have both name AND employeeId

// Intersecting directly in function parameters:
function processCheckout(data: { email: string } & { cardNumber: number }) {
  console.log(data.email, data.cardNumber);
}
```

---

# Type Narrowing & Control Flow

Type narrowing is the process of moving from a broad type to a more specific type using runtime checks.

## 1. Typeof Guards

Using `typeof` checks lets TypeScript know the exact type within an execution block and suggest safe methods.

```ts
function getOrder(kind: string | number) {
  if (typeof kind === "string") {
    return console.log(kind.toUpperCase()); // TS knows kind is string
  }
  return console.log(kind.toFixed(2)); // TS knows kind is number
}
```

## 2. Truthiness Checks

Handles checking optional parameters safely.

```ts
function serveOrder(msg?: string) {
  if (msg) {
    return console.log(`Serving: ${msg.toUpperCase()}`); // msg is guaranteed string
  }
}
```

## 3. Discriminated Unions

Using a shared literal property (called a "discriminant") to let TypeScript safely narrow down members of a union.

```ts
type SuccessResponse = { status: "success"; data: string[] };
type ErrorResponse = { status: "error"; data: string };
type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(res: ApiResponse) {
  if (res.status === "success") {
    return res.data; // TS narrows to SuccessResponse (string[])
  }
  return res.data; // TS narrows to ErrorResponse (string)
}
```

## 4. Forceful Type Assertion (`as`)

Informs TypeScript that we know the specific type of a variable better than the compiler (e.g., when parsing JSON).

```ts
type Book = { name: string };
const bookString = '{"name": "meditations"}';
const bookObject = JSON.parse(bookString) as Book; // Forcefully asserted as Book
```

## 5. The `never` Type for Exhaustive Checks

When a value is exhausted through all type-narrowing blocks, the remaining possible type is assigned `never`. If a new union member is added later and not handled, TypeScript will flag a compilation error.

```ts
type Role = "admin" | "user" | "superAdmin";

function check(role: Role) {
  if (role === "admin") return "Admin View";
  if (role === "user") return "User View";
  if (role === "superAdmin") return "SuperAdmin View";

  const exhaustiveCheck: never = role; // Safe: role is exhausted
  return exhaustiveCheck;
}
```

---

# Objects & Structural (Duck) Typing

## Declaring Object Shapes

You can declare object structures using type aliases or inline type annotations.

```ts
type Phone = {
  name: string;
  price: number;
  features: string[];
};
```

## Duck Typing (Structured Typing)

TypeScript's type system is **structural**, meaning it cares about the shape of an object, not its declared name or brand. If two objects have the same properties, they are considered compatible.

```ts
type User = { name: string; age: number };
const person = { name: "anjum", age: 20, city: "Gilgit" }; // Has extra property 'city'

function printUser(u: User) {
  console.log(u.name, u.age);
}
printUser(person); // OK! 'person' satisfies the shape of 'User'
```

---

# Arrays in TypeScript

Arrays can be defined with `T[]` or `Array<T>`.

```ts
const arr: string[] = ["one", "two", "three"];
const arr2: Array<string> = ["one", "two", "three"];
```

### Readonly Arrays

Prevents array mutations (like `.push()`, `.pop()`, or index reassignment).

```ts
const list: readonly string[] = ["one", "two"];
// list.push("three"); // ❌ Error: Property 'push' does not exist on type 'readonly string[]'
```

### Multidimensional (2D) Arrays

```ts
const table: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
];
```

---

# Enums (Enumerations)

Enums represent a group of named constants. Unlike types/interfaces, enums compile down to actual runtime JavaScript objects.

## 1. Numeric Enums

Members start at `0` and auto-increment by default.

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
} // Up = 0, Down = 1...
```

You can also assign custom starting values, and the rest will auto-increment:

```ts
enum StatusCode {
  OK = 200,
  Created, // 201
  BadRequest = 400,
  Unauthorized, // 401
}
```

## 2. String Enums

Every member is initialized with a string literal. String enums are highly readable during debugging.

```ts
enum UserRole {
  Admin = "ADMIN",
  Editor = "EDITOR",
  Viewer = "VIEWER",
}
```

## 3. Reverse Mapping

Numeric enums support reverse mapping (getting the key name from the value). String enums do NOT.

```ts
const nameOfZero = Direction[0]; // "Up"
```

---

# Mapped Utility Types & Transformations

Transform existing types into new structural blueprints.

### `Partial<T>`

Makes all properties of `T` optional. Great for database `PATCH` operations.

```ts
type User = { name: string; age: number; isTrue: boolean };
type PartialUser = Partial<User>; // { name?: string; age?: number; isTrue?: boolean; }
```

### `Required<T>`

Strips optional flags (`?`), making all properties of `T` mandatory.

```ts
type Admin = { id: string; name?: string; age?: number };
type ConcreteAdmin = Required<Admin>; // { id: string; name: string; age: number; }
```

### `Pick<T, K>`

Selects a literal union of keys `K` from `T`.

```ts
type SkeletonUser = Pick<User, "name" | "age">; // { name: string; age: number; }
```

### `Omit<T, K>`

Excludes specific keys `K` from `T`.

```ts
type PublicAdminProfile = Omit<Admin, "id">; // { name?: string; age?: number; }
```

### `Readonly<T>`

Appends the `readonly` modifier to all properties of `T` to prevent property mutation.

```ts
type ImmutableUser = Readonly<{ port: number; host: string }>;
```

### `Record<K, V>`

Constructs an object type with keys of type `K` and values of type `V`. Excellent for dictionaries and routing maps.

```ts
const API_ROUTES: Record<"auth" | "jobs", string> = {
  auth: "/api/v1/auth",
  jobs: "/api/v1/jobs",
};
```

---

# Functions & Type Invariants

Functions have typed inputs and outputs, which may share contracts or transform data.

## 1. Explicit Parameter & Return Types

```ts
function findUser(username: string): string {
  return `User: ${username}`;
}
```

## 2. Implicit Type Inference

If no return type is annotated, TypeScript infers it from the `return` statement's execution path.

```ts
function inferString(value: string) {
  return value; // Inferred as returning type 'string'
}
```

## 3. Absence of Value: `void` vs `never`

- `void` represents a function that executes an action but returns no meaningful data (returns `undefined` implicitly).
- `never` represents a function that never finishes executing or terminates by throwing an error.

```ts
function logMsg(msg: string): void {
  console.log(msg);
}

function terminate(msg: string): never {
  throw new Error(msg);
}
```

## 4. Optional & Default Parameters

Optional parameters are marked with `?` and default parameters use `=`.

```ts
function format(msg: string, prefix?: string): string {
  return prefix ? `${prefix}: ${msg}` : msg;
}

function tax(amount: number, rate = 0.18): number {
  return amount * rate;
}
```

## 5. Type Predicates (Custom Type Guards)

Functions that return `parameterName is Type` to explicitly narrow the type for any downstream blocks.

```ts
type APIUser = { name: string; email: string };

function isValidUser(payload: any): payload is APIUser {
  return (
    payload &&
    typeof payload.name === "string" &&
    typeof payload.email === "string"
  );
}
```

---

# Object-Oriented Programming (OOP)

TypeScript provides rich support for standard object-oriented patterns with compile-time checks, access control, and syntactic shorthand properties.

## 1. Shorthand Constructor (Parameter Properties)

Instead of declaring fields first and manually mapping them in constructors, prefixing constructor parameters with modifiers automatically declares and assigns them.

```ts
class Employee {
  constructor(
    public readonly id: number,
    public name: string,
    private salary: number,
  ) {} // Declares and assigns id, name, and salary on instantiate
}
```

## 2. Access Modifiers

- `public` (Default): Visible anywhere.
- `private`: Visible only within the declaring class.
- `protected`: Visible to the declaring class and its subclasses.

## 3. Inheritance & Method Overriding

Use `extends` to inherit. Subclasses calling their own constructors must execute `super()` first to initialize the parent. Subclasses can override methods and refer back to parents with `super.method()`.

```ts
class Account {
  constructor(
    public id: string,
    protected balance: number,
  ) {}
}

class SavingsAccount extends Account {
  constructor(
    id: string,
    balance: number,
    public rate: number,
  ) {
    super(id, balance);
  }
}
```

## 4. Getters & Setters (Accessors)

Intercept properties on-the-fly to perform validations or computed calculations.

```ts
class Temperature {
  private _celsius = 0;

  get celsius(): number {
    return this._celsius;
  }
  set celsius(val: number) {
    if (val < -273.15) throw new Error("Below absolute zero!");
    this._celsius = val;
  }
}
```

## 5. Abstract Classes & Methods

Abstract classes serve as base blueprints that cannot be instantiated directly. They can contain both concrete methods and abstract declarations that child classes MUST implement.

```ts
abstract class Shape {
  abstract getArea(): number;
}
```

---

# Generics

A generic is a placeholder type — written as `<T>` — that lets a function, interface, or class work with any type while still keeping full type safety. Instead of hardcoding a type or falling back to `any` (which throws away type-checking), the actual type is filled in at the call site.

## 1. Basic Generic Function

```ts
function identity<T>(value: T): T {
  return value;
}

identity<number>(5); // T = number
identity<string>("hi"); // T = string
```

## 2. Inference from Arguments

TypeScript can infer `T` from the arguments without needing it spelled out explicitly.

```ts
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

getFirst([1, 2, 3]); // T inferred as number
getFirst(["a", "b"]); // T inferred as string
```

## 3. Generic Interfaces

Useful for wrapper shapes (like API responses) that stay consistent but carry a different payload type each time.

```ts
interface ApiResponse<T> {
  data: T;
  error: string | null;
}

// const res: ApiResponse<User> = { data: user, error: null };
```

## 4. Constraints (`extends`)

An unconstrained generic gives TypeScript no guarantee about its shape, so accessing any property on it is an error. Adding `extends` tells the compiler the minimum shape `T` must satisfy.

```ts
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

getLength("hello"); // OK — strings have length
getLength([1, 2, 3]); // OK — arrays have length
// getLength(5);         // ❌ Error — number has no length
```

```ts
// Without a constraint, this fails:
function value<A, B>(a: A, b: B): [A, B] {
  // console.log(b.name); // ❌ Error — B could be anything, TS won't assume it has 'name'
  return [a, b];
}

// With a constraint, it works:
function valueFixed<A, B extends { name: string }>(a: A, b: B): [A, B] {
  console.log(b.name); // OK — B is guaranteed to have 'name'
  return [a, b];
}
```

## 5. Multiple Type Parameters

```ts
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

pair("age", 25); // [string, number]
```

## 6. Generic Classes

```ts
class Box<T> {
  constructor(private value: T) {}
  get(): T {
    return this.value;
  }
}

const b = new Box<string>("token");
```

## 7. Utility Types Are Generics Under the Hood

`Partial<T>`, `Required<T>`, `Pick<T, K>`, `Omit<T, K>`, `Readonly<T>`, and `Record<K, V>` are all built using generics internally — they're just pre-written generic types shipped with TypeScript.
