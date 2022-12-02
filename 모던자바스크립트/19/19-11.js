/**
 * 함수 객체만이 소유하는 prototype 프로퍼티는
 * 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다.
 * 따라서 함수로서 호출할 수 없는 함수,
 * 즉 non-constructor인 화살표 함수와 ES6 메서드 축약 표현으로 정의한 메서드는
 * prototype 프로퍼티를 소유하지 않으며 프로토타입도 생성하지 않는다.
 */

// 함수 객체는 prototype 프로퍼티를 소유한다.
console.log(function () {}.hasOwnProperty("prototype"));

// 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
console.log({}.hasOwnProperty("prototype"));
