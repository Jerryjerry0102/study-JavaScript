// Function
// - fundamental building block in the program
// - subprogram can be used multiple time   // 여러번 재사용 가능
// - performs a task or calculates a value  // 한 가지의 task나 값을 계산하기 위해 쓰임


// 1. Function declaration //
// function name(param1, param2){body... return;}
// 한 가지의 함수는 한 가지의 일만 하도록 해야 함
// one function === one thing
// 변수 이름을 정할 때는 명사로 이름을 지정했다(ex. name, age)
// 하지만 함수는 무언가 동작하는 것이기 때문에 동사형태로 이름을 지정해야 함.
// 함수 이름을 정하기 어렵다면 
// 내가 함수 안에서 너무 많은 것을 하려고 하고 있지 않은지 생각해볼 필요가 있음
// naming: doSomething, command, verb
// e.g. createCardAndPoint -> createCard, createPoint
// JavaScript에서 함수는 Object이기 때문에 함수를 변수에 할당할 수도 있고
// 파라미터로 전달이 되고 함수를 return할 수도 있게 됨.
// function is object in Js
function printHello(){
    console.log('Hello');
}
printHello();

function log(message){
    console.log(message);
}
log('Hello');
log(1234); 


// 2. Parameters //
// premitive parameters: passed by value
// object parameters: passed by reference
function changeName(obj){
    obj.name = 'coder';
}
const ellie = {name:'ellie'};
changeName(ellie);
console.log(ellie);


// 3. Default parameters (added in ES6) //
function showMessage(message, from = 'unknown'){
    // 예전에는 파라미터의 값이 전달되지 않을 경우를 대비해서
    // 아래처럼 적어줬지만 이제는 위처럼 간단하게 원하는 default 값을 적을 수 있음 
    // if(from === undefined){
    //     from = 'unknown';
    // }
    console.log(`${message} by ${from}`);
}
showMessage('Hi!');


// 4. Rest paramemters (added in ES6) //
// ... dot 3개를 작성하게 되면 배열형태로 전달되게 된다.
function printAll(...args){
    for(let i=0; i < args.length; i++){
        console.log(args[i]);
    }

    // for of 문법
    // args에 있는 모든 값들이 차례차례 하나씩 arg에 지정됨.
    for(const arg of args){
        console.log(arg);
    }

    // forEach
    // 배열 수업 때 자세히 배운다.
    args.forEach((arg) => console.log(arg));
}
printAll('dream', 'cording', 'ellie');


// 5. Local scope //
// ! 밖에서는 안이 보이지 않고 안에서만 밖을 볼 수 있다.
let globalMessage = 'global';       // grobal variable
function printMessage(){
    let message = 'hello';
    console.log(message);           // local variable
    console.log(globalMessage);
}
printMessage();


// 6. Return a value //
// 함수에서는 parameters로 값들을 전달 받아서 계산된 값을 return할 수 있다.
function sum(a, b){
    return a + b;
}
const result = sum(1, 2);
console.log(`sum: ${result}`);
// 모든 함수는 return undefined 이거나 우리가 값을 return 할 수 있다.


// 7. Early return, early exit
// bad
function upgradeUser(user){
    if(user.point > 10){
        // long upgrade logic...
        // block 안에서 logic을 많이 작성하면 가독성이 떨어짐
    }
}

// good
function upgradeUser(user){
    if(user.point <= 10){
        return;
    }
    // long upgrad logic...
    // 나중에 코드를 작성할 때
    // 조건이 맞지 않는 경우, 값이 undefined인 경우, 값이 -1인 경우
    // 빨리 return을 하고 필요한 logic은 그 뒤에 작성하는 것이 좋음
}


    //
// First-class function
// function are treated like any other variable
// can be assigned as a value to variable
// can be passed as an argument to other funtions.
// can be returned by another function


// 1. Function expression //
// a function declaration can be called earlier than it is defined. (hoisted)
// a function expression is created when the execution reaches it.
const print = function(){       // anonymous function
    console.log('print')
};
print();
const printAgain = print;
printAgain();
const sumAgain = sum;
console.log(sumAgain(1, 3));

// function declaration과 expression의 가장 큰 차이점은
// function expression은 할당된 다음부터 호출이 가능한 반면
// function declaration은 hoist가 된다.
// 즉, 함수가 선언되기 이전에 호출이 가능하다.
// 이건 JavaScript engine이 선언된 것을 제일 위로 올려주기 때문이다.


// 2. Callback function using function expression //
// 함수를 전달해서 상황이 맞으면 이 전달된 함수를 불러! 이게 callback function
function randomQuiz(answer, printYes, printNo){
    if(answer === 'love you'){
        printYes();
    }else{
        printNo();
    }
}
    // anonymous function //
    const printYes = function(){
        console.log('yes!');
    };

    // named function //
    // 이렇게 expression에서 함수의 이름을 쓰는 이유는
    // 1) better debugging in debugger's stack traces
    // 디버깅 할 떼 디버겅의 stack traces에 함수의 이름이 나오게 하기 위해서 쓰임
    // 나중에 디버깅 할 때 배우자
    // 2) recursions
    // 또는 함수 안에서 함수 자신 스스로를 부르기 위해서
    // call stack도 다음에 한 번 배워보자
    const printNo = function print(){
        console.log('no!');
    };
    randomQuiz('wrong', printYes, printNo);
    randomQuiz('love you', printYes, printNo);



    //
// Arrow function //
// 함수를 간결하게 만들어주는 좋은 아이
// always anonymous
// 항상 이름 없음
const simplePrint = function(){
    console.log('simplePrint');
}
// 간결
const simplePrint1 = () => console.log('simplePrint');

const add1 = function(a,b){
    return a + b;
}
// 간결
const add2 = (a,b) => a + b;

// 한 줄인 경우에는 block없이 가능하지만
// 함수 안에서 다양한 일들을 해야 한다면 아래처럼 써주면 된다.
// 대신 block이 있으면 return이라는 keyword를 입력해줘야 함.
const simpleMultiply = (a,b) => {
    // do something more
    return a*b;
};


    //
// IIFE: Immediately Invoked Function Expression //
// 원래는 함수를 선언하게 되면 나중에 우리가 따로 함수를 호출해 줘야 함
function hello(){
    console.log('IIFE');
}
hello();
// 선언함과 동시에 바로 호출을 하기 위해서는
// 함수의 선언을 소괄호로 묶은 다음에 ()를 입력해주면 함수가 호출됨.
(function hello(){
    console.log('IIFE');
})();




    //
// Fun quiz time
// function calculate(command, a, b)
// command: add, substract, divide, multiply, remainder

function calculate1(command, a, b){
    if(command === 'add'){
        console.log(a+b);
    }else if(command === 'substract'){
        console.log(a-b);
    }else if(command === 'divide'){
        console.log(a/b);
    }else if(command === 'multiply'){
        console.log(a*b);
    }else if(command === 'remainder'){
        console.log(a%b);
    }else{
        console.log('다시 입력하세요');
    }
}
calculate1('multiply', 100, 2);

// 정해진 데이터를 처리하는 경우에는 if문 보다는 switch문이 좋음
// switch case를 이용할 생각
function calculate2(command, a, b){
    switch (command){
        case 'add':
            return a + b;
        case 'substract':
            return a - b;
        case 'divide':
            return a / b;
        case 'multiply':
            return a * b;
        case 'remainder':
            return a % b;
        default:
            throw Error('unknown command');
    }
}
console.log(calculate2('add', 2, 3));