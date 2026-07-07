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
