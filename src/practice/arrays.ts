// ==============================================
// TOPIC: Arrays in Typescirpt
// ==============================================

const arr: string[] = ["one", "two", "three"];
const arr1: number[] = [2, 3, 4, 5];
const arr2: Array<string> = ["one", "two", "three"];

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

function getUser(data: UserType[]) {
  data.forEach((item) => {
    console.log(item.name);
  });
}

getUser(user);
