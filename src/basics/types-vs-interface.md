# Types vs Interfaces in TypeScript

Both `type` and `interface` are used to define the shape of an object.

**The simple rule:**

- Use **`interface`** when defining the shape of an object or a contract for a `class`.
- Use **`type`** when you need a Union (`|`), an Intersection (`&`), or to give a name to a basic datatype (like `string`).

---

### 1. Implementing Classes (Code examples from practice/index.ts)

You can use a `type` to define a class structure as long as it is a simple object. However, a class **cannot** implement a `type` if that type is a Union. This is why `interface` is the standard choice for classes.

```typescript
// ✅ This works: Class implementing a simple object Type
type Recipe = {
  name: string;
  sugar: number;
  milk: number;
};

class MakeTea implements Recipe {
  name: string = "chai";
  sugar: number = 100;
  milk: number = 50;
}

// ❌ This fails: A class cannot implement a Union Type
type ResponseStatus = { success: boolean } | { fail: boolean };
// class GetRes implements ResponseStatus { ... } // ERROR!

// ✅ The Fix: Use an Interface for the class contract
interface Response {
  success: boolean;
  fail: boolean;
}

class GetRes implements Response {
  success: boolean = true;
  fail: boolean = false;
}
```
