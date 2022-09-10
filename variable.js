// 자바스크립트의 공식사이트
// developer.mozilla.org

// 1. Use Strict //
// 순수 바닐라 JavaScript를 쓸 때는 맨 위에 use strict를 선언해주는 것이 좋다.
// Why?
// Whole-sript strict mode syntax
// JavaScript is very felxible
// flexible === dangerous
// added ECMAScript 5
// 조금 더 상식적인 범위에서 JavaScript를 이용하기 위해 앞으로 strict mode로 개발하자
// 또한 JavaScript engine이 조금 더 효율적으로 빠르게 분석 가능해서 성능 개선까지 가능
'use strict';
console.log('Hello World!');


// 2. Variable // 
// 변수 : 변경될 수 있는 값
// let (added in ES6)

// let이라는 keyword를 이용해서 name이라는 변수를 선언(declaration)했다.
// 선언함과 동시에 ellie라는 변수의 값을 할당
// let name = 'ellie';
// console.log(name);
// 그리고 다시 name이라는 변수에 hello라는 값을 다시 할당
// name = 'hello';
// console.log(name);

// application을 실행하게 되면 application 마다 쓸 수 있는 메모리가 할당되어지게 된다.
// 메모리는 텅텅 비워져 있는 박스들
// application마다 쓸 수 있는 박스들의 개수가 제한적으로 할당되어 진다.

    // Block scope //
    // 코드를 block 안에 작성하게 되면 block 밖에서는 안에 있는 내용을 볼 수 없음
    {
        let name = 'ellie';
        console.log(name);
        name = 'hello';
        console.log(name); 
    }
    // console.log를 이용해서 block 밖에서 name이란 변수에 접근하면 아무 값도 나오지 않음.
    console.log(name);

    // Global scope //
    // 반대로 block을 쓰지 않고 파일 안에다가 바로 정의해서 쓰는 변수들을 global scope이라고 부름.
    // 이 변수들은 어느 곳에서나 접근 가능하다
    // block 밖에서도 안에서도 가능
    let globalName = 'global name'
    {console.log(globalName);}
    console.log(globalName);
    // global한 변수들은 application이 실행되는 순간부터 끝날 때까지 항상 메모리에 탑재되어 있기 때문에
    // 최소한으로 쓰는 것이 좋음.
    // 가능하면 Class나 함수, if나 for문에서 필요한 부분에서만 정의해서 쓰는 것이 좋음

// JavaScript에서 변수를 선언할 수 있는 keyword는 let 딱 하나이다.
// var (don't ever use this!)
// var는 변수를 선언하기도 전에 값을 쓸 수 있다.
// var hoisting(move declaration from bottom to top)
// hoisting은 어디에 선언했냐에 상관없이 항상 제일 위로 선언을 끌어올려주는 것을 말한다.
// has no block scope
// var는 block을 철저히 무시한다.


// 3. Constants
// constant는 한 번 할당하면 값이 절대 바뀌지 않는 아이.
// favor immutable data type always for a few reasons:
    // - security
    // - thread safety         thread(스레드): cpu가 독립적으로 처리하는 하나의 작업 단위 
    // - reduce human mistakes
const daysInWeek = 7;
const maxNumber = 5;


// 4. Variable types //
// primitive, single item: number, string, boolean, null, undefined, symbol
// 더 이상 작은 단위로 나눠질 수 없는 한 가지의 아이템
// object, box container
// object는 single item들을 여러개 묶어서 한 단위로 한 박스로 관리할 수 있게 해준 것
// function, first-class function
// JavaScript에서는 function도 다른 데이터타입처럼 변수에 할당이 가능하고
// 또 그렇기 때문에 함수의 파라미터(인자)로도 전달이 되고
// 함수에서 return type으로도 function을 return할 수 있는 것이 가능하다.

    // number //
    // number - speical numeric values: infinity, -infinity, NaN
    const infinity = 1 / 0;
    const negativeInfinity = -1 / 0;
    const nAn = 'not a number' / 2;
    console.log(infinity);
    console.log(negativeInfinity);
    console.log(nAn);

    // string //

    // boolean //
    // false: 0, null, undefined, NaN, ''
    // true: any other value
    const canRead =  true;
    const test = 3  < 1;    // false

    // null //
    let nothing = null;
    // 내가 명확하게 너는 비어있는 값이야
    console.log(`value: ${nothing}, type= ${typeof nothing}`);

    // undefined //
    let x;
    // 선언은 되었지만 아무것도 값이 지정되어 있지 않음.
    console.log(`value: ${x}, type= ${typeof x}`);

    // symbol, create unique identifiers for objects //
    // symbol은 나중에 map이나 다른 자료구조에서 고유한 식별자가 필요하거나
    // 동시다발적으로 일어날 수 있는 코드에서 우선순위를 주고 싶을 때 쓰여짐.
    const symbol1 = Symbol('id');
    const symbol2 = Symbol('id');
    console.log(symbol1 === symbol2);       //false
    const a1 = 'a'
    const a2 = 'a'
    console.log(a1 ===  a2);                //true
    // symbol은 동일한 string을 작성해도 다른 symbol로 만들어지기 때문에
    // 주어지는 string에 상관없이 고유한 식별자를 만들 때 사용되어 진다.
    // string이 똑같다면 동일한 symbol을 만들고 싶다면 Symbol.for을 하면 된다.
    const gSymbol1 = Symbol.for('id');
    const gSymbol2 = Symbol.for('id');
    console.log(gSymbol1 === gSymbol2);     //true 
    // symbol은 바로 출력하게 되면 error가 발생
    // 항상 .description을 이용해서 string으로 변환해서 출력해야 함 
    console.log(`value: ${symbol1.description}, type= ${typeof symbol1}`);

    // object, real-life object, data structure
    // object는 우리가 일상생활에서 보는 물건과 물체들을 대표할 수 있는 박스 형태를 말한다.
    // 그냥 변수 name, age는 아무것도 설명이 되지 않지만
    // ellie라는 object를 만들면 name은 ellie age는 20이라고 얘기할 수 있음
    // ellie는 const로 지정이 되어있어서 한번 할당된 object는 다시는 다른 object로 변경이 불가하다.
    // 하지만 ellie object 안에는 name과 age라는 변수들이 존재한다.
    // 그래서 ellie.name, ellie.age라고 입력하면 각각 name과 age가 가리키고 있는 메모리에 다른 값을 할당할 수 있다.
    const ellie = {name: 'ellie', age: 20};
    ellie.age = 21;
    // object와 function은 너무 중요해서 다음에 다시 공부한다.


// 5. Dynamic typing: dynamically typed language //
// C언어나 JAVA언어는 statically typed language이다.
// 즉 변수를 선언할 때 어떤 type인지 결정해서 type을 같이 선언했던 반면
// JavaScript는 선언할 때 어떤 type인지 선언하지 않고
// runtime 프로그램이 동작할 때 할당된 값에 따라서 type이 변경될 수 있다는 것을 의미
// 이런 dynamic type언어는 내가 좋은 아이디어가 있을 때 빠르게 prototype을 하고 싶을 때는
// 유용하게 쓸 수 있는 언어지만, 다수의 엔지니어들이 아니면 규모가 있는 프로젝트를 만들 때는 좋지 않음
let text = 'hello';
console.log(text.charAt(0));        // h
console.log(`value: ${text}, type: ${typeof text}`);
text = 1;
console.log(`value: ${text}, type: ${typeof text}`);
text = '7' + 5;
console.log(`value: ${text}, type: ${typeof text}`);
// 문자열에 +가 있어서 number5를 string으로 변환해서 string + string을 하게 돼서 75가 나온다
text = '8' / '2';
console.log(`value: ${text}, type: ${typeof text}`);
// string에서 string을 나누면 number로 type이 변환되면서 4가 나옴.
console.log(text.charAt(0));        // error

// 많은 개발자들이 text라는 변수이름을 통해서 string의 type을 예상하고 있다.
// 그런데 누군가 중간에 type을 number로 바꾼 후 함수를 부르면 error가 발생한다.
// JavaScript는 런타임에서 type이 정해지기 때문에
// 이것 때문에 error가 runtime으로 발생하는 경우가 굉장히 많다.
// 그래서 TypeScript가 나온 것



