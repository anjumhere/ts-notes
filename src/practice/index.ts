// Union and Any

let reqStatus: "pending" | "success" | "error";

reqStatus = "pending";

// reqStatus can't be assinged with any other values other than listed in the union

// Any

let value: any;
value = "helo";
value = 44;
value = undefined;

//  value can be initialized with any datatype , it removes the type-checking, this is considered bad practice

// here's how to avoid Any (because its considered as bad practice)
const orders = ["10", "20", "30", "40"];

let currentOrders: string | undefined;

for (let order of orders) {
  if (order === "20") {
    currentOrders = order;
    break;
  }
}

console.log(currentOrders);
/*
 here we only  granted permission to use string  or undefined , because if  the currentOrders becomes
 undefined , we would get a typeerror  even if we include string | number , so using undefined we are making 
 sure that if the condition fails and currentOrders becomes undefined we would handle that 

*/
