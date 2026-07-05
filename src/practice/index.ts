// ============================================
// TOPIC: Union Types
// ============================================

/*
let reqStatus: "pending" | "success" | "error";
reqStatus = "pending";
*/
// Note: reqStatus can only be assigned one of the values listed in the union.
// Assigning anything else (e.g. reqStatus = "loading") will throw a type error.

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

//==================================
//TOPIC: TYPE NARROWING
//==================================

/*
function getOrder(kind: string | number) {
  if (typeof kind === "string") {
    return console.log(`The order ${kind} being processed`);
  }
  return console.log(`The order no ${kind} is being processed`);
}
getOrder(2105);
*/

// In this code , we have used type narrowing (typeof kind === 'string'), after  implementing
// - type-narrowing , it gives us suggestiong after we put dot(.) after the kind word ,  because inside the if condition
// -  we are sure that the type is string so if you are writing code , it helps here to figure out that which dataype we
// - are working with.
// If you look at the code outside the if condition the datatype can only be a number since in the union defined only two datatypes
// - so if we put a dot(.) after the kind outside the if condtion we get all the available method that we can use  on number datatype, which ultimately
// - helps us figure out what datatype we are working with.

// If you want some truthy value , so we do something like this
// /*
// function serveOrder(msg? :string){
//   if(msg){
//     return console.log(`Serving order ${msg}`)
//   }
//
//   return console.log(`Serving default order`)
// }
//
// serveOrder('pizza')

// exaustive checks to allow only methods/values that want , helpful in multiple things.

// const orderChai = (size: 'small'| 'medium' | 'large'){
//   if(size === 'small'){
//     return `serve small chai`
//   }
//
//   if(size === 'medium' || size === 'large'){
//     return `serve extra chai`
//   }
// }

// dicscriminated union

type SuccessResponse = { status: "success"; data: string[] };
type ErrorResponse = { status: "error"; data: string };
type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(res: ApiResponse) {
  if (res.status === "success") {
    return res.data; // ts knows this is a  successResponse
  }
  return res.data; // ts knows this is an errorResponse
}

// ts looks at apiresponse and it knows there are two possible outcomes (since it has union of error and success)
// then it sees res.status === 'success' and checks which type's union has  type == success , so
// only success matches the  successResponse and ts completely eliminates the errorresponse status and puts it inthe else block
