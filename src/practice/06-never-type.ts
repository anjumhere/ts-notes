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
