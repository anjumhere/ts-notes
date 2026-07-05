# Types vs Interfaces

Both `type` and `interface` let you describe the shape of data. Most of the time
they're interchangeable, but each has things the other can't do.

---

## 1. What only `type` can do

### Unions and primitives

````ts
type Role = "admin" | "user" | "superAdmin";
# Types vs Interfaces

Both `type` and `interface` let you describe the shape of data. Most of the time
they're interchangeable, but each has things the other can't do.

---

## 1. What only `type` can do

### Unions and primitives

```ts
type Role = "admin" | "user" | "superAdmin";
type ID = string | number;
````

Interfaces can't represent unions — only `type` can.

### Intersections

An intersection combines multiple types into one. Use `&` to merge them; the
result has every property from all combined types.

```ts
type User = { name: string };
type Admin = { name: string; privillage: string[] };

type SuperUser = User & Admin;

const su: SuperUser = {
  name: "ali",
  privillage: ["delete", "modify"],
};
```

You can also intersect directly in a function parameter:

```ts
type Contact = { email: string };
type Payment = { cardNumber: number };

function processCheckout(data: Contact & Payment) {
  console.log(data.email);
  console.log(data.cardNumber);
}
```

### Discriminated unions

A discriminated union is one or more object types joined with `|`, where a
shared field (here, `status`) tells TypeScript which shape it's dealing with.

```ts
type SuccessResponse = { status: "success"; data: string[] };
type ErrorResponse = { status: "error"; data: string };
type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(res: ApiResponse) {
  if (res.status === "success") {
    return res.data; // TS knows this is SuccessResponse
  }
  return res.data; // TS knows this is ErrorResponse
}
```

TypeScript narrows `res` based on the `status` check, eliminating the other
possibility inside each branch. This only works with `type`, since it relies
on a union.

---

## 2. What only `interface` can do

### Declaration merging

If you declare the same interface twice, TypeScript merges the two into one.
`type` throws an error if you try this (you'd get "duplicate identifier").

```ts
interface Car {
  brand: string;
}

interface Car {
  year: number;
}

// Car now has both properties, merged automatically
const myCar: Car = { brand: "Toyota", year: 2022 };
```

This is useful for extending types you don't own (e.g. adding a property to a
library's interface), but it also means interfaces can be accidentally
reopened elsewhere in a codebase — something a `type` alias can't do.

---

## 3. Classes: `implements`

Both `type` and `interface` can be used with `implements`, but only if the
type resolves to a **single, definite object shape**. A class can't implement
a union, because a class instance can't be "one shape or another" — it has to
be exactly one shape.

```ts
type Receipe = {
  type: string;
  sugar: number;
  milk: number;
};

class MakeTea implements Receipe {
  type: string = "chai";
  sugar: number = 100;
  milk: number = 50;
}
```

This works fine with `type`, as long as `Receipe` is a plain object type.
The problem only shows up if the type is a union:

```ts
type Response = { ok: "success" } | { ok: "failure" };

class GetRes implements Response {
  // Error: a class can only implement an object type or
  // intersection of object types — not a union.
}
```

Switching to `interface` doesn't "fix" this by itself — it fixes it because
the interface below is written as one plain shape, not a union:

```ts
interface Response {
  success: boolean;
  fail: boolean;
}

class GetRes implements Response {
  success: boolean = true;
  fail: boolean = false;
}
```

**Takeaway:** the rule isn't "classes need interfaces." It's "classes need one
concrete object shape." Interfaces just make it harder to accidentally write a
union, since they don't support the `|` syntax at all.

---

## 4. Extending

Interfaces extend other interfaces with `extends`. Types achieve the same
result with `&`.

```ts
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

const d: Dog = { name: "Rex", breed: "Labrador" };
```

```ts
type Animal = { name: string };
type Dog = Animal & { breed: string };

const d: Dog = { name: "Rex", breed: "Labrador" };
```

Same result, different syntax.

---

## 5. Quick reference

| Feature                          | `type` |         `interface`         |
| -------------------------------- | :----: | :-------------------------: |
| Object shapes                    |   ✅   |             ✅              |
| Unions (`\|`)                    |   ✅   |             ❌              |
| Intersections (`&`)              |   ✅   | ❌ (uses `extends` instead) |
| Primitives / tuples / functions  |   ✅   |             ❌              |
| Declaration merging              |   ❌   |             ✅              |
| `implements` (single shape only) |   ✅   |             ✅              |
| Extending                        |  `&`   |          `extends`          |

**Rule of thumb:** use `interface` for plain object/class shapes you might
extend later, and `type` for anything involving unions, intersections, or
non-object data.
