/**
 * __proto__ 접근자 프로퍼티는 상속을 통해 사용된다.
 *
 * __proto__ 접근자 프로퍼티는 객체가 직접 소유하는 프로퍼티가 아니라
 * Object.prototype의 프로퍼티다.
 * 모든 객체는 상속을 통해 Object.prototype.__proto__ 접근자 프로퍼티를 사용할 수 있다.
 */

const person = { name: "Lee" };

// person 객체는 __proto__ 프로퍼티를 소유하지 않는다.
console.log(person.hasOwnProperty("__proto__"));

// __proto__ 프로퍼티는 모든 객체의 프로토타입 객체인 Object.prototype의 접근자 프로퍼티다.
console.log(Object.prototype.hasOwnProperty("__proto__"));
console.log(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__"));

// 모든 객체는 Object.prototype의 접근자 프로퍼티 __proto__를 상속받아 사용할 수 있다.
console.log({}.__proto__ === Object.prototype);
