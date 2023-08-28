// 빌더 패턴은 객체를 생성하는 복잡한 과정을 캡슐화하여, 객체의 생성과 표현을 분리하는 디자인 패턴
// 빌더 패턴을 이용하면 객체의 생성과 표현을 독립적으로 관리할 수 있으며,
// 객체 생성 과정을 단계적으로 구현할 수 있다.

class Person {
  constructor(name, age, gender, height, weight, address, phone) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.height = height;
    this.weight = weight;
    this.address = address;
    this.phone = phone;
  }

  introduce() {
    console.log(
      `My name is ${this.name}, and I'm ${this.age} years old. I'm a ${this.gender}`
    );
  }
}

// 이 클래스는 매개변수가 많기 때문에, 객체 생성 코드가 복잡해질 수 있다.
// 이를 해결하기 위해 빌더 패턴으로 만들어진 PersonBuilder을 만들어보자.

// Person 클래스를 이용하여 객체를 생성하는 빌더 클래스이다.
class PersonBuilder {
  constructor(name) {
    this.person = new Person();
    this.person.name = name;
  }

  age(age) {
    this.person.age = age;
    return this;
  }

  gender(gender) {
    this.person.gender = gender;
    return this;
  }

  height(height) {
    this.person.height = height;
    return this;
  }

  weight(weight) {
    this.person.weight = weight;
    return this;
  }

  address(address) {
    this.person.address = address;
    return this;
  }

  phone(phone) {
    this.person.phone = phone;
    return this;
  }

  build() {
    return this.person;
  }
}

// PersonBuilder로 Person 객체 생성하기
const person = new PersonBuilder("박재희")
  .age(25)
  .gender("male")
  .height(155)
  .weight(47)
  .address("서울시")
  .phone("010-6495-5703")
  .build();

person.introduce();
