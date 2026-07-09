//=================================================
// TOPIC: Normal Classes in typescript
//=================================================

// Definition: A class is a blueprint. Properties are declared with their
// type first (name: string), then the constructor fills them in when
// you create ("new") an object.
class User {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  greet() {
    console.log(`Hello my name is ${this.name} and my age is ${this.age}`);
  }
}
const u1 = new User("Anjum", 25);
console.log(u1);
// Output: User { name: 'Anjum', age: 25 }

//================================================
// TOPIC: Access Modifiers
//================================================

// Definition: public = accessible from anywhere (default, even if you don't write it)
// private = only accessible INSIDE this class, not from outside, not from subclasses
class Shop {
  public fastFood: string = "burger";
  private rooms: string = "staff-room";
  getAccess() {
    return this.rooms; // ✅ allowed, we're inside the class
  }
}
const s = new Shop();
s.getAccess(); // ✅ works — calling the method is allowed
// s.rooms;     // ❌ would error — 'rooms' is private, can't touch from outside

// Definition: protected = accessible inside this class AND any class that extends it,
// but NOT accessible from outside code
class Safe {
  protected lock: string = "safe-Lock";
}
class Owner extends Safe {
  ownerAccess() {
    this.lock; // ✅ allowed — Owner is a subclass of Safe
  }
}
const o = new Owner();
o.ownerAccess(); // ✅ works
// o.lock;       // ❌ would error — can't access protected from outside

// NEW THING: "#" private fields (this is actual JavaScript syntax, not just TS)
// Definition: # makes a property truly private at the JS runtime level (not just
// a TypeScript compile-time check). TS's "private" keyword only blocks you at
// compile time — the property still technically exists on the object in plain JS.
// "#" fields are enforced by the JS engine itself, so they're hidden even at runtime.
class Wallet {
  #balance: number = 100;
  getBalance() {
    return this.#balance; // ✅ allowed inside the class
  }
}
const wallet = new Wallet();
wallet.getBalance(); // ✅ returns 100
// wallet.#balance;  // ❌ SyntaxError — can't even reference # fields from outside

// readonly properties
// Definition: readonly means the property can be set during construction only.
// Once the object is fully created, it can never be reassigned.
class Check {
  readonly capacity: number = 250;
  constructor(capacity: number) {
    this.capacity = capacity; // ✅ still allowed — we're inside the constructor
  }
}
const check = new Check(100); // capacity is now locked at 100 (overwrote the default 250)
// check.capacity = 299;      // ❌ error — can't assign to readonly property outside constructor
console.log(check);
// Output: Check { capacity: 100 }

//=================================================
// TOPIC: Getters and Getters
// ================================================

class Value {
  private _salary: number = 25000;

  get getsalary() {
    // to access the private variable salary we will use getter get
    return this._salary;
  }

  set salary(value: number) {
    // to set the value of the private variable _salary we use setter set.
    if (value < 25000) throw new Error("Salary too low"); // if salary is less then 25000, it
    // will throw an error
    this._salary = value; // if salary is greater then 25000 , it will set the new value , which will come as input from the user.
  }
}

const sal = new Value();
sal.salary = 2503430;
console.log(sal.getsalary);
