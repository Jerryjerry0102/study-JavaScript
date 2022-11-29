var x = "global";

function foo() {
  console.log(x); // ① undefined
  var x = "local";
}

foo();
console.log(x); // global
