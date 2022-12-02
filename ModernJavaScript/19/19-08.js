/** __proto__ 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유
 * 프로토타입 체인은 단방향 링크드 리스트로 구현되어야 한다.
 * 즉, 프로퍼티 검색 방향이 한쪽 방향으로만 흘러가야 한다.
 * 따라서 아무런 체크 없이 무조건적으로 프로토타입을 교체할 수 없도록
 * __proto__ 접근자 프로퍼티를 통해 프로토타입에 접근하고 교체하도록 구현되어 있다.
 */

const parent = {};
const child = {};

// child의 프로토타입을 parent로 설정
child.__proto__ = parent;
// parent의 프로토타입을 child로 설정
parent.__proto__ = child;
