// 1. String concatenation //
console.log('my' + 'cat');
console.log('1' + 2);
console.log(`string literals: 1 + 2 = ${1 + 2}`);
console.log("ellie's \nbook");
console.log("ellie's \tbook");
// 특수문자열: \n 줄바꿈, \t tab키


// 2. Numeric opertors //
console.log(1 + 1);     // add
console.log(1 - 1);     // subtract
console.log(1 / 1);     // divide
console.log(1 * 1);     // multiply
console.log(5 % 5);     // remainder
console.log(2 ** 3);    // exponentiation // 거듭제곱


// 3. Increment and decrement operators //
// pre: 업데이트 후 할당
// post: 할당 후 업데이트
let counter = 2;
const preIncrement = ++counter;
    // counter = counter + 1;
    // preIncrement = counter;
console.log(`preIncrement: ${preIncrement}, counter: ${counter}`);
const postIncrement = counter++; 
    // postIncrement = counter;
    // counter = counter + 1;
console.log(`postIncrement: ${postIncrement}, counter: ${counter}`);
const preDecrement = --counter;
console.log(`preDecrement: ${preDecrement}, counter: ${counter}`);
const postDecrement = counter--; 
console.log(`postDecrement: ${postDecrement}, counter: ${counter}`);


// 4. Assignment operators //
let x = 3;
let y = 6;
x += y;     // x = x + y;
x -= y;
x *= y;
x /= y;


// 5. Comparison operators //
console.log( 10 < 6);       // less than
console.log( 10 <= 6);       // less than or equal
console.log( 10 > 6);       // greater than
console.log( 10 >= 6);       // greater than or equal


// 6. Logical operators: || (or), && (and), ! (not) //
const value1 = false;
const value2 = 4 < 2;   //false

    // (or) ||, finds the first truthy value //
    // 하나라도 true라면 true로 계산되는 연산자
    // ! or 연산자는 처음으로 true가 나오면 거기서 멈춘다.
    // 하나라도 true면 어짜피 true이기 때문에
    // computation이 heavy한(연산을 많이하는) 함수를 호출하거나
    // expression이나 함수를 호출하는 아이들을 제일 앞에 두면 안 된다!!
    // 당연히 simple한 value 아이들을 앞에 두고
    // 앞에 value들이 false일 때만 마지못해 호출하는 것이 제일 좋다 
    console.log(`or: ${value1 || value2 || check()}`);


    // (and) &&, finds the first falsy value //
    // 모두 true여야 true를 return한다
    // value1이 false가 나오게 되면 어짜피 false이기 때문에 뒤에 2개는 실행되지 않는다.
    // or가 마찬가지로 heavy한 operation 일수록 제일 뒤에서 check하는 것이 좋음
    console.log(`and: ${value1 && value2 && check()}`);

    // often used to compress long if-statement
    // nullableObject && nullableObject.something
    // null 입력 가능한 Object
    // Object가 null이면 false가 되기 때문에 뒤에가 실행이 안 됨
    // 즉 nullableObject가 null이 아닐때만 object에 something이라는 value를 받아오게 됨
    // if (nullableObject != null){
    //     nullableObject.something;
    // }

    function check(){
        for (let i = 0; i < 10; i++){
            // wasting time
            console.log('놀람');
        }
        return true;
    }

    
    // (not) !
    // 값을 반대로 바꿔줌
    console.log(!value1);


// 7. Equality //
const stringFive = '5';
const numberFive = 5;

    // == loose equality, with type conversion
    console.log(stringFive == numberFive);
    console.log(stringFive != numberFive);

    // === strict equality, no type conversion
    console.log(stringFive === numberFive);
    console.log(stringFive !== numberFive);
    // 코딩할 때는 웬만하면 strict equality를 사용해서 검사하는 게 더 좋음

// object equality by reference
// object는 memory에 탑재될 때 reference 형태로 저장된다.
// ellie1과 ellie2는 똑같은 data가 들어있는 object이지만 
// 실제로 memory에는 1과 2에 각각 다른 reference가 들어있고
// 그 다른 reference는 서로 다른 object를 가리키고 있다.
// ellie3은 ellie1의 reference가 할당되어 있음
const ellie1 = {name: 'ellie'};
const ellie2 = {name: 'ellie'};
const ellie3 = ellie1
console.log(ellie1 == ellie2);      // false
console.log(ellie1 === ellie2);     // false
console.log(ellie1 === ellie3);     // true

// equality - puzzler
console.log(0 == false);            // true
console.log(0 === false);           // false
console.log('' == false);           // true
console.log('' === false);          // false
console.log(null == undefined);     // true
console.log(null === undefined);    // false


// 8. Conditional operators: if //
// if, else if, else
const name = 'ellie';
if (name === 'ellie'){
    console.log('Welcome, Ellie');
} else if (name === `coder`){
    console.log('You are amazing coder');
} else {
    console.log('unknown');
}


// 9. Ternary operator: ? //
// if를 간단하게 쓸 수 있음
// condition ? value1 : value2;
console.log(name === 'ellie' ? 'yes' : 'no');
// name === 'ellie가 true면 두번째 있는 것을 실행하고
// false면 세번째 있는 것을 실행해라
// 간단할 때만 쓰는 것이 좋음


// 10. Switch statement //
// use for multiple if checks
// use for enum-like value check
// use for multiple type checks in Ts
const browser = 'Firefox';
switch (browser){
    case 'IE':
        console.log('go away!');
        break;
    case 'Chrome':
    case 'Firefox':
        console.log('love you!')
        break;
    default:
        console.log('same all!');
        break;
}
// if문에서 else if를 반복해서 사용한다면 switch를 고려하는 게 좋고
// 나중에 ts에서 정해저 있는 type을 검사하거나 
// enum 비슷한 아이들을 검사할 때는 switch를 쓰는 것이 가독성에 좋다


// 11. Loops
// while loop, while the condition is truthy,
// body code is executed.
// statement가 false로 나오기 전까지 무한대로 반복
let i = 3;
while(i>0){
    console.log(`while: ${i}`);
    i--; 
}

// do while loop, body code is executed first,
// then check the condition
// 먼저 block을 실행한 다음에 조건이 맞는지 검사한다.
do{
    console.log(`do while: ${i}`);
    i--;
} while (i>0);
// block을 먼저 실행하고 싶다면 do while
// 조건문이 맞을 때만 block을 실행하고 싶다면 while을 써야함

// for loop, for(begin; condition; step)
for (i=3; i>0; i--){
    console.log(`for: ${i}`);
}
// for loop는 begin을 처음에 한 번만 호출한다
for (let i=3; i>0; i= i-2){
    // inline variable declaration
    // block안에 let이라는 지역변수를 선언해서 작성해도 좋다.
    console.log(`inline variable for: ${i}`);
}

// nested loop
for(let i=0; i<10; i++){
    for(let j=0; j<10; j++){
        console.log(`i: ${i}, j: ${j}`);
    }
}
// i가 0일 때 j를 0~9까지 돌리고
// i가 1일 때 j를 0~9까지 돌리고
// 이렇게 작성하는 것은 cpu에 좋지 않아서 되도록 피하는 게 좋다


// break, continue
// 이렇게 loop 안에서는 break, continue keyword를 써서 loop를 끝낼 수 있다.
// continue는 지금 것만 skip하고 다시 다음 step을 넘어갈 때 쓰이고 
    // 01. iterate from 0 to 10 and print only even numbers(use continue)
    for(let c = 0; c <=10; c++){
        if(c%2 !== 0){
            continue;
        }
        console.log(`c: ${c}`)
    }
    // 원래는 짝수일 때만 출력하게 하는 방식이 더 좋음

    // 02. iterate from 0 to 10 and print numbers until reaching 8(use break)
    let a = 0;
    while( a <= 10){
        console.log(`a: ${a}`)
        if(a===8){
            break;
        }
        a++;
    }

    for(let b=0; b <= 10; b++){
        if(b>8){
            break;
        }
        console.log(`b: ${b}`)
    }