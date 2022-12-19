const todos = [
  { id: 1, content: 'HTML', completed: true },
  { id: 2, content: 'CSS', completed: false },
  { id: 3, content: 'JS', completed: false },
];

// todos 배열의 첫 번째 요소인 객체로부터 id 프로퍼티만 추출한다.
// const [{ id }] = todos;
// console.log(id); // 1

// todos 배열의 두 번째 요소인 객체로부터 id 프로퍼티만 추출한다.
// const [, { id }] = todos;
// console.log(id); // 2

// todos 배열의 세 번째 요소인 객체로부터 id 프로퍼티만 추출한다.
const [, , { id }] = todos;
console.log(id); // 3
