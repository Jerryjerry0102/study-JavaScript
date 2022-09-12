// my
// class는 object를 만드는 틀(template)
// 그래서 데이터가 들어있지 않음
// class를 이용해서 실제 데이터를 넣어서 만드는 것이 바로 object
// class를 이용해서 새로운 instance를 생성하면 object가 되는 것


// Class : template
// Object: instance of a Class

// 1. Class declarations
// class라는 keyword를 이용해서 Person이라는 Class를 만들고
class Person{
    // constructor
    // constructor이라는 생성자를 이용해서 나중에 object를 만들 때 필요한 데이터를 전달
    constructor(name, age){
        // fields
        // 이 Class에 존재하는 2가지 fields에 전달받은 데이터를 바로 할당해줌.
        this.name = name;
        // 생성된 object.name
        this.age = age;
    }

    // methods
    // 말하는 method도 존재
    speack(){
        console.log(`${this.name}: hello!`)
    }
}

// 새로운 objcet를 만들때는 new라는 keyword를 씀
const ellie = new Person('ellie', 20);
console.log(ellie.name);
console.log(ellie.age);
ellie.speack();
console.log(ellie);



// 2. Getter and setters
// Class를 사용하는 사용자가 바보같이 잘못 사용해도 오류를 방어할 수 있도록 해준다.
// 1) Getter
    // getter는 property에 접근할 때마다 그 값을 계산하도록 해야 하거나
    // 내부 변수 상태를 명시적인 함수 호출 없이 보여주고 싶을 때 사용
// 2) Setter
    // setter는 특정한 속성에 값이 변경될 때마다 함수를 실행하는데 사용될 수 있다.
class User {
    constructor(firstName, lastName, age){
        this.firstName = firstName,
        this.lastName = lastName,
        this.age = age;
    }

    // User의 age가 -1이라는 것은 말이 되지 않기 때문에
    // get이라는 keyword를 이용해서 값을 return하고
    get age(){
        this._age = this._age + 1
        return this._age;
    }
 
    // set이라는 keyword를 이용해서 값을 설정할 수 있음
    // set은 값을 설정하기 때문에 value를 받아와야 함.
    set age(value){
        if(value<0){
            // throw Error('age can not be negative');
            this._age = 0;
        }
        // this._age = value < 0 ? 0 : value;
    }
}

const user1 = new User('Steve', 'Job', -5);
console.log(user1.age);
console.log(user1.age);
console.log(user1.age);
console.log(user1.age);




// 3. Fields (public, private) // 아직 이름
class Experiment{
    // 생성자(constructor)를 쓰지 않고 field를 정의할 수 있는데
    // 그냥 정의하면 public, 즉 외부에서 접근이 가능하고
    publicField = 2;
    // #을 붙이면 private, 즉 Class 내부에서만 값이 보여지고 접근 가능하고 변경이 가능
    // Class 외부에서는 읽을 수도 변경할 수도 없다.
    #privateField = 0;
}
const experiment = new Experiment();
// console.log(experiment.publicField);    
// console.log(experiment.privateField);        //undefined



// 4. Static properties and methods // 아직 이름
// Too soon!
// 간혹 이런 object 이런 데이터에 상관없이
// 클래스가 가지고 있는 고유한 값과 동일하게 반복되어 사용되어 지는 메소드가 있을 수 있다.
// 그런 것들을 static이라는 keyword를 이용해서 붙이면
// object에 상관없이 Class 자체에 연결되어 있다.
class Article{
    static publisher = 'Dream Cording';
    constructor(articleNumber){
        this.articleNumber = articleNumber;
    }

    static printPublisher(){
        console.log(Article.publisher);
    }
}

const article1 = new Article(1);
const article2 = new Article(2);
// console.log(article1.publisher);    //undifined
console.log(Article.publisher);
// article1.printPublisher();          //얘는 오류가 뜨네
Article.printPublisher();

// ts에도 많이 쓰임
// 어쩔 때 쓰면 좋을까?
// object에 상관없이, 들어오는 데이터에 상관없이 
// 공통적으로 Class에서 쓸 수 있는 거라면
// static과 static method를 이용해서 작성하는 것이 메모리의 사용을 줄일 수 있다.



// 5. Inheritance 상속과 다형성 //
// a way for one class to extend another class
class Shape{
    constructor(width, height, color){
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(){
        console.log(`drawing ${this.color} color!`);
    }

    getArea(){
        return this.width * this.height;
    }
}

// extends라는 keyword를 이용해서 Shape을 연장함.
// 이렇게만 정의해도 Shape에서 정의한 fields와 methods가 자동적으로 Rectangle에 포함된다.
class Rectangle extends Shape{}
const rectangle = new Rectangle(20, 20, 'blue');
rectangle.draw();

// 이렇게 상속을 이용하게 되면 공통되어지는 것들을 일일이 작성하지 않아도
// 공통된 부분을 재사용 할 수 있다.
class Triangle extends Shape{
    //*3// 우리가 필요한 함수만 재정의해서 쓸 수 있다.(overwriting)
    getArea(){
        return (this.width * this.height)/2;
    }
    //*4// 우리가 공통적으로 정의한 draw도 그려주면서 색다르게 더 그려주고 싶다면
    draw(){ 
        console.log('삼각형');
        //*5// draw라는 method를 overwriting하는 것이 아니라 부모의 method도 보여주고 싶다면
        //*6// 부모의 draw라는 함수를 호출하게 되면 부모의 method도 호출된다.
        super.draw();
    }
}
const triangle = new Triangle(20, 20, 'red');
triangle.draw();

//*1// 다형성이 정말 획기적인 일을 함
console.log(rectangle.getArea());
console.log(triangle.getArea());
//*2// 우리가 필요한 함수만 재정의해서 쓸 수 있다.



// 6. Class checking: instanceof
// 왼쪽에 있는 Object가 오른쪽에 있는 Class의 instance인지 아닌지
// 즉 왼쪽에 있는 Object가 오른쪽에 있는 Class를 이용해서 만들어졌는지 아닌지 확인하는 것\
// true or false를 return함
console.log(rectangle instanceof Rectangle);    // true
console.log(triangle instanceof Rectangle);     // false
console.log(triangle instanceof Triangle);      // true
console.log(triangle instanceof Shape);         // true
console.log(triangle instanceof Object);        // true
// 우리가 JavaScript에서 만든 모든 Object와 Class들은 JavaScript의 Object를 상속한 것.



// 자바스크립트 object들
// JavaScript MDN reference 페이지