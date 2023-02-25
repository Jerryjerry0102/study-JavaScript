function a(x: string | number): number {
  return 0;
}
a("1"); // 1

type B = (x: string) => number | string;
const b: B = a;

// 리턴 값은 좁은 타입 -> 넓은 타입 대입 가능
// 매개변수는 넓은 타입 -> 좁은 타입 대입 가능
