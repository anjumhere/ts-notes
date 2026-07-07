# TypeScript Technical Deep Dive: Runtime & Type Logic Practice

## 1. Union vs. Any Types

### Definition

- **Unions (`|`):** Restrict a variable's memory space to hold only a strict, predefined set of literal values or data types.
- **Any (`any`):** Bypasses the TypeScript compiler's static analysis completely. It treats the value like raw JavaScript, stripping away your safety invariants and autocompletion tooling. Always lean on unions or explicit optional states (`string | undefined`) over `any`.

### Code Reference

```typescript
let reqStatus: "pending" | "success" | "error" = "pending";

const orders = ["10", "20", "30", "40"];
let currentOrders: string | undefined; // Safe representation of absence over 'any'

for (let order of orders) {
  if (order === "000") {
    currentOrders = order;
    break;
  }
  currentOrders = "100";
}

## 2. Type Narrowing & Exhaustive Checks
### Definition

The process of isolating a broad type union down to a specific, singular execution block at runtime. This is achieved using logical evaluations like JavaScript's native typeof checks, truthiness evaluation, or matching structural literal keys. Once narrowed, the compiler unlocks full autocompletion for that distinct type's methods.

Code Reference
TypeScript
function getOrder(kind: string | number) {
  if (typeof kind === "string") {
    // Compiler knows 'kind' is natively a string here
    return console.log(`The order ${kind.toUpperCase()} being processed`);
  }
  // Compiler definitively knows 'kind' can only be a number down here
  return kind.toFixed(2);
}

function serveOrder(msg?: string) {
  if (msg) {
    return console.log(`Serving order ${msg}`); // Truthy narrowing drops 'undefined'
  }
  return console.log(`Serving default order`);
}
Discriminated Unions (Tagged Unions)
TypeScript
type SuccessResponse = { status: "success"; data: string[] };
type ErrorResponse = { status: "error"; data: string };
type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(res: ApiResponse) {
  // Using the unique literal 'status' property as a discriminator tag
  if (res.status === "success") {
    return res.data; // Safely resolves straight to string[]
  }
  return res.data; // Safely resolves straight to string
}

##3. The never Type & Total Pattern Matching
###Definition

The never type indicates values or code branches that theoretically should never occur or finish executing. It is highly critical for implementing total pattern matching or ensuring comprehensive switch statements across an enumeration or literal union.

Code Reference
TypeScript
type Role = "admin" | "user" | "superAdmin";

function checkRoleExhaustion(role: Role) {
  if (role === "admin") return "Admin View";
  if (role === "user") return "User View";
  if (role === "superAdmin") return "Super View";

  // Exhaustive compilation check:
  // If you add a new role to the 'Role' type later without writing an 'if' branch for it,
  // the compiler throws a flag right here because the type won't resolve to 'never'.
  const exhaustiveCheck: never = role;
  return exhaustiveCheck;
}
4. Duck Typing (Structured Typing)
Definition
TypeScript operates entirely on structural compatibility. It doesn't care about nominal classifications (the exact name of the type definition/class block). If an object's structural shape satisfies the minimum properties mandated by a target type signature, the compiler permits the transaction.

Code Reference
TypeScript
type Product = { name: string; price: number };
const consoleHardware = { name: "PS5 Pro", price: 799, stock: 12 };

function logProduct(p: Product) {
  console.log(`${p.name} cost: $${p.price}`);
}

// Passes matching shape cleanly even though consoleHardware has an extra 'stock' property
logProduct(consoleHardware);
💡 Senior Peer Example: Advanced Discriminated Union
Concept
This is a standard backend structural pattern for state-machines and API response formatters. It forces strict type contracts based on a unified payload structure.

TypeScript
type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: { id: string; name: string }[] }
  | { type: "FETCH_FAILURE"; errorCode: number };

function stateReducer(action: Action) {
  switch(action.type) {
    case "FETCH_START":
      return "Loading spinner initialized...";
    case "FETCH_SUCCESS":
      // Action structure matches the exact signature of the target case block
      return `Loaded ${action.payload.length} items from Heap memory buffer.`;
    case "FETCH_FAILURE":
      return `Error code: ${action.errorCode.toFixed(0)} critical failure.`;
  }
}
```
