const funcs = [];

for (var i = 0; i < 3; i++) {
  funcs[i] = function () {
    return i;
  };
}
console.log(funcs[1]());

for (let j = 0; j < funcs.length; j++) {
  console.log(funcs[j]());
}
