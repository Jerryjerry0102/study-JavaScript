const foods = ['apple', 'banana', 'orange'];

// food 배열에 'orange' 요소가 존재하는지 확인한다.
if (foods.indexOf('orange') === -1) {
  // foods 배열에 'orange' 요소가 존재하지 않으면 'orange' 요소를 추가한다.
  foods.push('orange');
}
console.log(foods); // [ 'apple', 'banana', 'orange' ]

// ES7에서 도입된 Array.prototype.includes 메서드를 사용하면 가독성이 더 좋다.
const foods2 = ['apple', 'banana', 'orange'];

// food 배열에 'orange' 요소가 존재하는지 확인한다.
if (!foods2.includes('orange')) {
  // foods 배열에 'orange' 요소가 존재하지 않으면 'orange' 요소를 추가한다.
  foods2.push('orange');
}
console.log(foods2);
