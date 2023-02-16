// 타입스크립트는 타입을 추론하는 기능이 있기 때문에
// 타입이 제대로 추론되면 타입핑을 굳이 할 필요가 없다.
// 타입스크립트가 추론을 잘못하거나 any라는 타입으로 추론할 경우 직접 타입핑

// 오히려 타입을 쓰는 것이 문제가 될 수도 있다.
// const a: string = "5";
// 타입은 최대한 정확하게 하는 것이 중요
// a는 평생 '5'인데 string이라는 타입으로 부정확하게 만듬

/** 변수 타입핑 */
const a = "hello";
const b = 5;
const c = true;
const d = undefined;
const e = null;

const f: any = 123;
const g: true = true;
const h: 5 = 5;

/** 함수 타입핑 */
// x도 number y도 number이기 때문에 둘을 더하면 당연히 number
// 이렇게 정확할 경우에는 result를 number로 만들어 준다.
function add(x: number, y: number) {
  return x + y;
}
const result = add(1, 2);

/** 객체 타입핑 */
const obj = { lat: 37.5, lon: 127.5 };

/** 배열 타입핑 */
const arr = ["123", "456"];
const arr2 = [123, 456];
const arr3: [number, number, string] = [123, 456, "hello"];

// ->
// 추론이 잘되면 최대한 추론에 맡기자
// 타입은 최대한 좁게 잡자

// 여기서부터 기본 문법은 노션 정리
