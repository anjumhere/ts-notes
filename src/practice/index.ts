// ============================================
// TOPIC: Union Types
// ============================================

/*
let reqStatus: "pending" | "success" | "error";
reqStatus = "pending";
*/
// Note: reqStatus can only be assigned one of the values listed in the union.
// Assigning anything else (e.g., reqStatus = "loading") will throw a type error.

// ============================================
// TOPIC: The "any" type
// ============================================

/*
let value: any;
value = "hello";
value = 44;
value = undefined;
*/
// Note: "any" allows a variable to hold any datatype and removes type-checking
// entirely. This defeats the purpose of TypeScript and is considered bad practice.

// ============================================
// TOPIC: Avoiding "any" (using Union instead)
// ============================================

/*
const orders = ["10", "20", "30", "40"];
let currentOrders: string | undefined;

for (let order of orders) {
  if (order === "000") {
    currentOrders = order;
    break;
  }
  currentOrders = "100";
}

console.log(currentOrders);
*/
// Note: Instead of using "any", we grant permission to only "string | undefined".
// This ensures that if currentOrders is never assigned inside the loop, it stays
// as "undefined" (a valid, expected state) instead of silently allowing any type.
// This keeps type-safety intact while still handling the "no match found" case.

// ============================================
// TOPIC: Type Narrowing
// ============================================

/*
function getOrder(kind: string | number) {
  if (typeof kind === "string") {
    return console.log(`The order ${kind} being processed`);
  }
  return console.log(`The order no ${kind} is being processed`);
}
getOrder(2105);
*/
// In this code, we have used type narrowing (typeof kind === 'string'). After implementing
// type-narrowing, TS gives us suggestions when we put a dot (.) after the 'kind' word because,
// inside the if condition, we are sure that the type is a string. This helps figure out
// which datatype we are working with.

// Outside the if condition, the datatype can only be a number (since the union only has two types).
// Putting a dot (.) outside the if condition gives all available number methods.

// Checking for truthy values:
/*
function serveOrder(msg?: string) {
  if (msg) {
    return console.log(`Serving order ${msg}`);
  }
  return console.log(`Serving default order`);
}
serveOrder('pizza');
*/

// Exhaustive checks to allow only specific values:
/*
const orderChai = (size: 'small' | 'medium' | 'large') => {
  if (size === 'small') {
    return `serve small chai`;
  }
  if (size === 'medium' || size === 'large') {
    return `serve extra chai`;
  }
};
*/

// ============================================
// TOPIC: Discriminated Union
// ============================================
/*
type SuccessResponse = { status: "success"; data: string[] };
type ErrorResponse = { status: "error"; data: string };
type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(res: ApiResponse) {
  if (res.status === "success") {
    return res.data; // TS knows this is a SuccessResponse
  }
  return res.data; // TS knows this is an ErrorResponse
}
*/
// TS looks at ApiResponse and knows there are two possible outcomes.
// When it sees res.status === 'success', it matches SuccessResponse and
// completely eliminates the ErrorResponse status, putting it in the implicit else block.

// ============================================
// TOPIC: Forceful Type Assertion ("as")
// ============================================

// let res: any = "32";
// Here, if you check 'res', the type is still 'any' despite setting a string value.
// We use 'as' to implement forceful type assertion.

// let num: number = (res as string).length;
// By asserting 'res' as a string, we tell TS to treat it as a string.
// Since 'num' is typed as a number, we can safely assign a string method (.length) that returns a number.

// Another example parsing JSON:
/*
type Book = {
  name: string;
};

const bookString = '{"name": "meditations"}';
const bookObject = JSON.parse(bookString) as Book;
console.log(bookObject.name);
*/

// ============================================
// TOPIC: The "never" type
// ============================================
/*
type Role = "admin" | "user" | "superAdmin";
// Add 'superAdmin' later, first check the role with 'admin' and 'user'.

function check(role: Role) {
  if (role === "admin") {
    console.log("redirected to admin");
    return;
  }
  if (role === "user") {
    console.log("redirected to user");
    return;
  }
  if (role === "superAdmin") {
    console.log("redirected to superAdmin");
    return;
  }
  // If a role falls through all checks, TS assigns it the 'never' type
  // because this line of code should theoretically never be reached.
  role;
}
*/

// Example of a function that truly never finishes executing:

/*
function neverRun(): never {
  while (true) {}
}
*/
// This block will never finish running because it is an infinite loop.

// ============================================
// TOPIC: Interfaces vs. Types
// ============================================
/*
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

*/

// everything until here is ok , we can use types on classes but if you do this

// type Response = {ok: 'success'} | {ok: 'false'}
/*
interface Response {
  success: boolean;
  fail: boolean;
}

class Getres implements Response {
  // here it will throw error saying a class can only implement object or intersection of object , so we make interface here
  success: boolean = true;
  fail: boolean = false;
}
*/

// now it won't throw any error. We can use types with classes but sometimes we need to use interace for classesj

// ============================================
// TOPIC: Intersection
// ============================================
/*
 An intersection allows you to combine multiple types into a single type. We use & symbol to combine multiple types. When we combine
  multiple types into a single type , that new type contains all the properties of the other types.
*/

// Example
/*
type User = { name: string };
type Admin = { name: string; privillage: string[] };

type SuperUser = User & Admin;

const Su: SuperUser = {
  name: "ali",
  privillage: ["delete", "modify"],
};

// using intersections directly on function

type Contact = { email: string };
type Payment = { cardNumber: number };

function processCheckout(data: Contact & Payment) {
  console.log(data.email);
  console.log(data.cardNumber);
}
*/
// ============================================
// TOPIC: Objects in Typescript
// ============================================

// let tea: {
//   name: string;
//   price: number;
//   isHot: boolean;
// };
//
// tea = {
//   name: "ginger tea",
//   price: 23,
//   isHot: true,
// };

/*
type Phone = {
  name: string;
  price: number;
  features: string[];
};

const myPhone: Phone = {
  name: "Samsung",
  price: 1000,
  features: ["Ultra-zoom", "gaming-centric", "ai-loaded"],
};
*/

// ============================================
// TOPIC:TypeScript Duck-Typing
// ============================================

/*
Duck Typing in Typescript is usually called structured typing. Ts cares about shape not type and name.
*/

// Object example

type User = { name: string; age: number };
const person = { name: "anjum", age: 20 };

function data(u: User) {
  console.log("name: ", u.name, "Age :", u.age);
}
data(person);

type Item = { name: string; quantity: number };
type Address = { street: string; pin: number };

type Order = {
  id: number;
  items: Item[];
  address: Address;
};

const makeOrder: Order = {
  id: Math.floor(Math.random() * 199999999),
  items: [{ name: "gaming-mouse", quantity: 15000 }],
  address: { street: "Xth road Islamabad", pin: 3214 },
};

function showOrder(order: Order) {
  console.log("Id: ", order.id);
  order.items.forEach((item) => {
    console.log(`Name : ${item.name} quantity: ${item.quantity}`);
  });
  console.log("Address : ", order.address.street);
}

showOrder(makeOrder);
