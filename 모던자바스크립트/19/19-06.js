//* __proto__는 접근자 프로퍼티다.

const obj = {};
const parent = { x: 1 };

// getter 함수인 get __proto__가 호출되어 obj 객체의 프로토타입을 취득
console.log(obj.__proto__);

// setter 함수인 set __proto__가 호출되어 obj 객체의 프로토타입을 교체
obj.__proto__ = parent;

console.log("obj.__proto__", obj.__proto__);
console.log("obj", obj);
console.log("parent", parent);
console.log("obj.x", obj.x);
