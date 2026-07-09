//================================================
//TOPIC: Interface
//================================================

/*
interfaces mainly describes the shape of the objects, what type must exists and what type each one has.
*/

// CASE 1: Objects

interface User {
  name: string;
  age: number;
  city: string;
  skills: string[];
}

const user: User = {
  name: "jayce",
  age: 23,
  city: "London",
  skills: ["full-stack", "backend", "cloud"],
};

// CASE 2: Function Shapes

interface Greet {
  (name: string): string;
}

const greet: Greet = (n) => `Hi ${n}`;

// CASE 3: Class Contracts (via implements)

interface Moveable {
  speed: number;
  move(): void;
}

class Car implements Moveable {
  speed = 200;
  move() {
    console.log("driving");
  }
}

// CASE 4:  Arrays/indexable structures/ index signatures

interface StringArray {
  [item: string]: number;
}

const rating: StringArray = {
  gamingMouse: 6.5,
  gamingKeyboard: 8.8,
};

console.log(rating.gamingMouse);

//============================
//TOPIC : Interface merging
//============================

interface Inter {
  name: string;
}
interface Inter {
  age: number;
}

const u: Inter = {
  name: "anjum", // from interface 1
  age: 23, // from interface 2
};

// We can murge multiple interface using extends

interface A {
  a: string;
}
interface B {
  b: number;
}

// now we will merge interface A and B with c, so  interface C will be both a and b shape
interface C extends A, B {}
