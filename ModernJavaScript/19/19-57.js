const obj = Object.create({ name: "Lee" }, { x: { value: 20 } });
console.log(obj.hasOwnProperty("name"));
console.log(obj.hasOwnProperty("x"));
