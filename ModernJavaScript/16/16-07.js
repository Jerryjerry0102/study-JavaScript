/**
 * 접근자 프로퍼티와 데이터 프로퍼티를 구별하는 방법은 다음과 같다.
 * Object.getOwnPropertyDescriptor 메서드가 반환한
 * 프러퍼티 어트리뷰트를 객체로 표현한 프로퍼티 디스크립터 객체를 살펴보면
 * 접근자 프로퍼티와 데이터 프로퍼티의 프로퍼티 디스크립터 객체의 프로퍼티가 다른 것을 알 수 있다.
 */

// 일반 객체의 __proto__는 접근자 프로퍼티다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__"));
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}

// 함수 객체의 prototype은 데이터 프로퍼티다.
console.log(Object.getOwnPropertyDescriptor(function () {}, "prototype"));
// {value: {...}, writable: true, enumerable: false, configurable: false}
