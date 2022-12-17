const target = 'Is this all there is?';
const regExp = /is/;

console.log(regExp.exec(target));
// [ 'is', index: 5, input: 'Is this all there is?', groups: undefined ]
console.log(target.match(regExp));
// [ 'is', 'is' ]
