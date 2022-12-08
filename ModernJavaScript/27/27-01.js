// 배열이란?
const arr = ['apple', 'banana', 'orange'];

// 배열의 요소에 접근
console.log(arr[0]); // 'apple'
console.log(arr[1]); // 'banana'
console.log(arr[2]); // 'orange'

// 배열의 길이
console.log(arr.length); // 3

// 배열의 순회
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]); // 'apple', 'banana', 'orange'
}

// 배열은 객체 타입
console.log(typeof arr); // object
