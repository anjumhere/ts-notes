// ============================================
// TOPIC: Forceful Type Assertion ("as")
// ============================================

// let res: any = "32";
// Here, if you check 'res', the type is still 'any' despite setting a string value.
// We use 'as' to implement forceful type assertion.

// let num: number = (res as string).length;
// By asserting 'res' as a string, we tell TS to treat it as a string.
// Since 'num' is typed as a number, we can safely assign a string method (.length) that returns a number.

// Another example parsing JSON:
/*
type Book = {
  name: string;
};

const bookString = '{"name": "meditations"}';
const bookObject = JSON.parse(bookString) as Book;
console.log(bookObject.name);
*/
