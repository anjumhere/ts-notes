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
