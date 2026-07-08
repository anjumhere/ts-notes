// ==============================================
// TOPIC: Arrays in Typescirpt
// ==============================================
/*
const arr: string[] = ["one", "two", "three"];
const arr1: number[] = [2, 3, 4, 5];
const arr2: Array<string> = ["one", "two", "three"];
arr.push("four");
console.log(arr);
*/
type UserType = {
  name: string;
  age: number;
  isValid: boolean;
};

const user: UserType[] = [
  {
    name: "jayce",
    age: 23,
    isValid: false,
  },
  {
    name: "Eagon",
    age: 10,
    isValid: true,
  },
];

// Readonly : When you create a array with readonly , you can't modify the array.

const arr: readonly string[] = ["one", "two"];
// arr.push('hello') // this will throw an error because you can'tt modify a readonly array.

// 2D-Arrays.

const table: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
];

// Tuples

const TupleCode: [string, number] = ["hello", 34];
// The order matters here , if you have mentioned string first , then the first value should be string
// else it will throw an error

// Readonly Tuples
//

const Tuples2: readonly [number, string] = [23, "one"];
// This is a readonly tuple , which you can't modify.

// Named Tuples: Mostly prefered over , normal tuples.

const NamedTuple: [name: string, age: number] = ["anjum", 23];

// You need to specify the data types that you will use in the code.
