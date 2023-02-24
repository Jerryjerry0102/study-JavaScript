interface Arr<T> {
  forEach(callbackfn: (v: T, i: number, array: T[]) => void): void;
  map<S>(callbackfn: (v: T, i: number, array: T[]) => S): S[];
  filter<S extends T>(callback: (v: T, i: number, array: T[]) => v is S): S[];
}

const a: Arr<number> = [1, 2, 3];
const b = a.filter((v): v is number => v % 2 === 0); // [2] number[]

const c: Arr<number | string> = [1, "2", 3, "4", 5];
const d = c.filter((v): v is string => typeof v === "string"); // ['2', '4'] string[]

const predicate = (v: string | number): v is number => typeof v === "number";
const e = c.filter(predicate); // [1, 3, 5] number[]
