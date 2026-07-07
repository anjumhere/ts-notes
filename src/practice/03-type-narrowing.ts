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
