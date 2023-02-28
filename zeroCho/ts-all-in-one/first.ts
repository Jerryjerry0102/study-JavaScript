const a = [1, 2, 3, [1, 2], [[1], [2]]].flat(); // [1, 2, 3, 1, 2, [ 1 ] [ 2 ]]
const b = [1, 2, 3, [1, 2]].flat(); // [1, 2, 3, 1, 2]
const c = [1, 2, 3, [1, 2], [[1], [2]]].flat(2); // [1, 2, 3, 1, 2, [ 1 ] [ 2 ]]

type A = {
  name: string;
  age: number;
};
type B = A[1 extends number ? "age" : "name"];
