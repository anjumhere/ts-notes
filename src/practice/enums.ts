// ==============================================
// TOPIC: Enums in TypeScript
// ==============================================

/*
  What is an Enum?
  An enum (enumeration) is a special "class" that represents a group of constants 
  (unchangeable variables). Unlike most TypeScript features (like interfaces/types), 
  enums are not just a compile-time feature—they actually compile down to JavaScript 
  objects that exist at runtime.
*/

// ==============================================
// 1. Numeric Enums (Default)
// ==============================================
// By default, enums initialize their first member to 0 and auto-increment each
// subsequent member by 1.

enum Direction {
  Up, // 0
  Down, // 1
  Left, // 2
  Right, // 3
}

// Usage example:
let currentDirection: Direction = Direction.Up;
console.log("Current Directonn: ");
// You can also assign custom starting values, and the rest will auto-increment from there:
enum StatusCode {
  OK = 200,
  Created, // 201
  Accepted, // 202
  BadRequest = 400,
  Unauthorized, // 401
}

const responseStatus: StatusCode = StatusCode.Created;
console.log("Response Status:", responseStatus); // Output: 201

// ==============================================
// 2. String Enums
// ==============================================
// In a string enum, each member must be constant-initialized with a string literal.
// String enums do not auto-increment, but they have better readability at runtime/debugging.

enum UserRole {
  Admin = "ADMIN",
  Editor = "EDITOR",
  Viewer = "VIEWER",
}

// Usage example:
type User = {
  name: string;
  role: UserRole;
};
const appUser = {
  name: "jayce",
  role: UserRole.Admin,
};

function getRole(userRole: UserRole) {
  console.log(`The Role of the User is : ${userRole}`);
}
getRole(UserRole.Admin);
if (appUser.role === UserRole.Admin) {
  console.log(`${appUser.name} has full access control.`);
}

// ==============================================
// 3. Heterogeneous Enums (Mixed)
// ==============================================
// Enums can technically contain both string and numeric members, though this is
// generally discouraged as it can lead to confusion.

enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES",
}

// ==============================================
// 4. Reverse Mapping
// ==============================================
// Numeric enums support reverse mapping (getting the name of a member from its value),
// whereas string enums do NOT support reverse mapping.

const directionName = Direction[0]; // Gets the key name "Up"
console.log("Direction[0] corresponds to key:", directionName); // Output: "Up"
