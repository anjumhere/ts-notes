// ============================================
// TOPIC: Required <R> utility type
// ============================================

// In required utility type , you must fill all the values that are present in the type definition else it
// will throw an error

type Admin = {
  id: string;
  name?: string;
  age?: number;
  isValid?: true;
};

const getAdmin = (data: Required<Admin>) => {
  console.log(data);
};

getAdmin({
  id: "hs8cnn0oohn2",
  name: "admin",
  age: 23,
  isValid: true,
});

// ============================================
// TOPIC: Omit <O> utility type
// ============================================

// In Omit utility type , you can skip/exclude or hide a value from your object

type PublicAdmin = Omit<Admin, "id">; // now the admin id is not included in this type defintion
