const funcs = [];

for (let i = 0; i < 3; i++) {
  funcs[i] = (function (id) {
    // ①
    return function () {
      return id;
    };
  })(i);
}

for (let j = 0; j < funcs.length; j++) {
  console.log(funcs[j]());
}
