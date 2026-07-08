// ============================================
// TOPIC: TypeScript Functions & Type Invariants
// ============================================

/*
 * --- Case 1: Matching Input and Output Types ---
 * Input and output share the exact same primitive or structural contract.
 */
/*
function findUser(username: string): string {
  return `User: ${username}`;
}
*/
/*
 * --- Case 2: Transforming Types (Different Input & Output) ---
 * FIXED: This is completely valid. A function's main job is data transformation.
 * It only errors if your 'return' value doesn't match the stated 'OutputType'.
 */
//
// function getStringLength(value: string): number {
//   return value.length; /* Takes a string, returns a raw number block. */
// }
//

/*
 * --- Case 3: Implicit Type Inference ---
 * If you leave the output blank, the compiler inspects the execution path
 * of the return statement and assigns the type automatically for you.
 */
// function unknownOutput(value: string) {
//   return value; /* Automatically inferred as type 'string' */
// }
//
/*
 * --- Case 4: Complete Absence of Value (void) ---
 * Used when a function executes an action (like mutations or logging) but returns
 * no data back. Attempting to return a value here will throw a compilation error.
 */
// function noOutput(val: string): void {
//   console.log(val);
//   /* return 'hello'; // ❌ Error: Type 'string' is not assignable to type 'void'. */
// }
//
/*
 * --- Case 5: The Unreachable Termination (never) ---
 * Distinct from void. This means the function NEVER returns a value because
 * it terminates the current execution stack abruptly (e.g., throwing a hard error).
 */
// function terminateProcess(msg: string): never {
//   throw new Error(`Critical Exception: ${msg}`);
// }
//
/*
 * --- Case 6: Optional and Default Parameters ---
 * Parameters can be flagged as optional via '?' (making them type | undefined),
 * or given a direct fallback value which automatically handles type inference.
 */
// function formatMessage(msg: string, prefix?: string): string {
//   if (prefix) return `${prefix}: ${msg}`;
//   return msg;
// }
//
// function calculateTax(amount: number, rate: number = 0.18): number {
//   return amount * rate;
// }
//
/*
 * --- Case 7: Type Predicates (Custom Type Guards) ---
 * A powerful function that returns a boolean but tells the compiler that the type
 * has been explicitly narrowed down for any downstream blocks.
 */
// type APIUser = { name: string; email: string };
//
// function isValidUser(payload: any): payload is APIUser {
//   return (
//     payload &&
//     typeof payload.name === "string" &&
//     typeof payload.email === "string"
//   );
// }
