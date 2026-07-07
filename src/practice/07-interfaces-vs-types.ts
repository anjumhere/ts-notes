// ============================================
// TOPIC: Interfaces vs. Types
// ============================================
/*
type Receipe = {
  type: string;
  sugar: number;
  milk: number;
};

class MakeTea implements Receipe {
  type: string = "chai";
  sugar: number = 100;
  milk: number = 50;
}

*/

// everything until here is ok , we can use types on classes but if you do this

// type Response = {ok: 'success'} | {ok: 'false'}
/*
interface Response {
  success: boolean;
  fail: boolean;
}

class Getres implements Response {
  // here it will throw error saying a class can only implement object or intersection of object , so we make interface here
  success: boolean = true;
  fail: boolean = false;
}
*/

// now it won't throw any error. We can use types with classes but sometimes we need to use interace for classesj
