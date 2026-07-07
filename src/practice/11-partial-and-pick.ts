// ============================================
// TOPIC: Partial <T> utility type
// ============================================

// You can update any value partially , means its not compulsory to add everything that you mentioned in the
// type , even if you leave its value empty like empty object, i will not throw an error.
type User = {
  name: string;
  age: number;
  isTrue: boolean;
};

function updateUser(update: Partial<User>) {
  console.log(update.name);
}

updateUser({ name: "anjum", age: 25 });

// ============================================
// TOPIC: Pick <P> utility type
// ============================================

// In the pick utility type you can pick specific data that you want to use. It will continue to throw
// error until to put the data that has been mentioned in the pick syntax.

type UserPick = Pick<User, "name" | "age">;

const getUser: UserPick = { name: "user", age: 30 };
