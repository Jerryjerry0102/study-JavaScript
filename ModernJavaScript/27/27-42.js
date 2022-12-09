// true
console.log(Array.isArray([]));
console.log(Array.isArray([1, 2]));
console.log(Array.isArray(new Array()));

// false
console.log(Array.isArray());
console.log(Array.isArray({}));
console.log(Array.isArray(null));
console.log(Array.isArray(undefined));
console.log(Array.isArray('Array'));
console.log(Array.isArray(true));
