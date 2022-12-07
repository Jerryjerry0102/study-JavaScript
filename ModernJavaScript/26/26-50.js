function foo(param, ...rest) {
  console.log('param: ', param); // param:  1
  console.log('rest: ', rest); // rest:  [ 2, 3, 4, 5 ]
}

foo(1, 2, 3, 4, 5);

function bar(param1, param2, ...rest) {
  console.log('param1: ', param1); // param1:  1
  console.log('param2: ', param2); // param2:  2
  console.log('rest: ', rest); // rest:  [ 3, 4, 5 ]
}

bar(1, 2, 3, 4, 5);
