function Person(name) {
  this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

const me = new Person("Lee");

// hasOwnProperty는 Object.prototype의 메서드다.
console.log(me.hasOwnProperty("name")); // true

/**
 * 이것은 me 객체가 Person.prototype뿐만 아니라
 * Object.prototype도 상속받았다는 것을 의미한다.
 * me 객체의 프로토타입은 Person.prototype이다.
 */

console.log(Object.getPrototypeOf(me) === Person.prototype); // -> true

/**
 * Person.prototype의 프로토타입은 Object.prototype이다.
 * 프로토타입의 프로토타입은 언제나 Object.prototype이다.
 */

console.log(Object.getPrototypeOf(Person.prototype) === Object.prototype); // -> true
