// ============================================
// TOPIC: TypeScript Duck-Typing
// ============================================

/*
Duck Typing in Typescript is usually called structured typing. Ts cares about shape not type and name.
*/

// Object example
//
// type User = { name: string; age: number };
// const person = { name: "anjum", age: 20 };
//
// function data(u: User) {
//   console.log("name: ", u.name, "Age :", u.age);
// }
// data(person);
//
// type Item = { name: string; quantity: number };
// type Address = { street: string; pin: number };
//
// type Order = {
//   id: number;
//   items: Item[];
//   address: Address;
// };
//
// const makeOrder: Order = {
//   id: Math.floor(Math.random() * 199999999),
//   items: [{ name: "gaming-mouse", quantity: 15000 }],
//   address: { street: "Xth road Islamabad", pin: 3214 },
// };
//
// function showOrder(order: Order) {
//   console.log("Id: ", order.id);
//   order.items.forEach((item) => {
//     console.log(`Name : ${item.name} quantity: ${item.quantity}`);
//   });
//   console.log("Address : ", order.address.street);
// }
//
// showOrder(makeOrder);
