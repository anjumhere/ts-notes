//===================================================
// TOPIC : Generics
//===================================================
//Generics let you write functions, classes, or types that work with any type while still preserving type
//safety — instead of hardcoding a specific type or using any (which loses all type info).

// Basic generic function - T is a placeholder type filled in at call time
function identity<T>(value: T): T {
  return value;
}
identity<number>(5);
identity<string>("hi");

// Generic function inferred from array elements
function getFirst<T>(arr: T[]): T[] {
  return arr;
}
getFirst([1, 2, 3]); // T = number
getFirst(["a", "b"]); // T = string

// Generic interface - same shape, different payload type
interface ApiResponse<T> {
  data: T;
  error: string | null;
}
// const res: ApiResponse<User> = { data: user, error: null };

// Constraints - restrict what T can be using extends
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}
getLength("hello"); // ok, strings have length
getLength([1, 2, 3]); // ok, arrays have length
// getLength(5);         // error, number has no length

// Multiple type params
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}
pair("age", 25); // [string, number]

// Generic class
class Box<T> {
  constructor(private value: T) {}
  get(): T {
    return this.value;
  }
}
const b = new Box<string>("token");

// Utility types are generics under the hood: Partial<T>, Omit<T, K>, Pick<T, K>
