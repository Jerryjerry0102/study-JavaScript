class Person {
  // 클래스 필드 정의
  name = 'Lee';

  constructor() {
    console.log(this.name);
    console.log(name); // ReferenceError: name is not defined
  }
}

const me = new Person('Lee');
console.log(me); // Person { name: 'Lee' }
