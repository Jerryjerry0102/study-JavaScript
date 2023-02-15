// 타입을 붙여주는 행위를 타입핑한다라고 함
// 타입스크립트는 에러메시지가 상세하게 나와있다. 잘 읽어보자

/** 변수 타입핑 */
const a: string = "hello";
const b: number = 5;
const c: boolean = true;
const d: undefined = undefined;
const e: null = null;
// any는 뒤에 아무거나 넣을 수 있다.
// 타입스크립트의 주 목적은 any를 없애는 것
const f: any = 123;
// 타입자리에 아예 고정된 원시값을 넣을 수도 있다.
// 타입은 최대한 정확한 게 좋은데 const는 바뀔 일이 없기 때문에!
const g: true = true;
const h: 5 = 5;

/** 함수 타입핑 */
function add(x: number, y: number): number {
  return x + y;
}
// 화살표 함수 타입핑1
const add2: (x: number, y: number) => number = (x, y) => x + y;
// 화살표 함수 타입핑2
// 타입을 빼줄 수 있다.
type Add = (x: number, y: number) => number;
const add3: Add = (x, y) => x + y;
// 인터페이스로 함수 타입핑(심화 과정)
interface Add2 {
  (x: number, y: number): number;
}
const add4: Add2 = (x, y) => x + y;

/** 객체 타입핑 */
const obj: { lat: number; lon: number } = { lat: 37.5, lon: 127.5 };

/** 배열 타입핑 */
// 기본
const arr: string[] = ["123", "456"];
// 제네릭(심화 과정)
const arr2: Array<number> = [123, 456];
// 튜플(길이가 고정된 배열)
const arr3: [number, number, string] = [123, 456, "hello"];
