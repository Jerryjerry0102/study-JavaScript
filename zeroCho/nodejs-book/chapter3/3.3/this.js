console.log(this); // {}
console.log(this === module.exports); // true
console.log(this === exports); // true
console.log(this === {}); // false

function whatIsThis() {
  console.log(this); // global
  console.log(this === global); // true
}
whatIsThis();
