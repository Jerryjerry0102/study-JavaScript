// type Exclude<T, U> = T extends U ? never : T;
// type Extract<T, U> = T extends U ? T : never;

type Animal = "Cat" | "Dog" | "Human";
type Mammal = Exclude<Animal, "Human">;
type Human = Extract<Animal, "Human">;
